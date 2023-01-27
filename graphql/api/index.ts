import { SQLDataSource } from 'datasource-sql';
import { Knex } from 'knex';

import { database } from '../config';
import { AuthContext } from '../types';
import { createAuthorizationPlan } from './authorization';
import {
  TableColumnMaps,
  TableName,
  FilteredFields,
  AuthQueryPlan,
  DatasourceContext,
} from './types';

/**
 * Setup mappings for graphql columns that don't match the SQL columns.
 *
 * @type {TableColumnMaps}
 */
const tableColumnMaps: TableColumnMaps = {
  methodSets: [
    ['methSetID (CK)', 'methSetID_CK'],
    ['stepIndexID (CK)', 'stepIndexID_CK'],
  ],
};

/**
 * The QuerySet class is responsible for performing queries on the underlying
 * SQL database via knex.js, and applying any filters required by either the
 * authorization or the graphql query.
 * 
 * @export
 * @class QuerySet
 * @typedef {QuerySet}
 */
export class QuerySet {
  /**
   * The knex QueryBuilder object
   *
   * @private
   * @type {Knex.QueryBuilder}
   */
  private querySet;
  /**
   * Knex object
   *
   * @private
   * @type {Knex}
   */
  private knex;
  /**
   * The authorization context of the query
   *
   * @private
   * @type {AuthContext}
   */
  private auth;
  /**
   * The database schema
   *
   * @private
   * @type {string}
   */
  private schema;
  /**
   * Creates an instance of QuerySet.
   *
   * @constructor
   * @public
   * @param {Knex} knex
   * @param {TableName} table
   * @param {string} schema
   * @param {AuthContext} auth
   * @param {?readonly [string, string][]} [columnMaps]
   * @param {?boolean} [first]
   */
  public constructor(
    knex: Knex,
    table: TableName,
    schema: string,
    auth: AuthContext,
    columnMaps?: readonly [string, string][],
    first?: boolean
  ) {
    this.knex = knex;
    this.auth = auth;
    this.schema = schema;
    if (!auth.authenticated) {
      this.querySet = null;
    } else {
      const aliases = (tableColumnMaps[table] || [])
        .concat(Array.isArray(columnMaps) ? columnMaps : [])
        .map((cm) => `${cm[0]} as ${cm[1]}`);

      const qb = knex.withSchema(schema);

      this.querySet = first
        ? qb.first('*', ...aliases).from(table)
        : qb.select('*', ...aliases).from(table);

      this.secure(this.querySet, createAuthorizationPlan(this.auth, table));
    }
  }
  /**
   * Apply the specified filters to the SQL.
   *
   * @public
   * @param {FilteredFields} filter
   * @returns {*}
   */
  public applyFilter(filter: FilteredFields) {
    if (this.querySet === null) return new Promise((resolve) => resolve([]));
    if (filter && typeof filter === 'object') {
      for (const k of Object.keys(filter)) {
        const params = filter[k];
        if ('is' in params) {
          this.querySet.where(k, params.is);
        }
        if ('contains' in params) {
          this.querySet.where(k, 'like', `%${params.contains}%`);
        }
        if ('startsWith' in params) {
          this.querySet.where(k, 'like', `${params.startsWith}%`);
        }
        if ('endsWith' in params) {
          this.querySet.where(k, 'like', `%${params.endsWith}`);
        }
        if ('greaterThan' in params) {
          this.querySet.where(k, '>', params.greaterThan || 0);
        }
        if ('lesserThan' in params) {
          this.querySet.where(k, '<', params.lesserThan || 0);
        }
        if ('greaterOrEqualThan' in params) {
          this.querySet.where(k, '>=', params.greaterOrEqualThan || 0);
        }
        if ('lesserOrEqualThan' in params) {
          this.querySet.where(k, '<=', params.lesserOrEqualThan || 0);
        }
        if ('between' in params) {
          const between = params.between;
          if (between)
            this.querySet.whereBetween(k, [between.min, between.max]);
        }
      }
    }
    console.log(this.querySet.toString());
    return this.querySet;
  }
  /**
   * Apply the filters related to authorization to the query
   *
   * @private
   * @param {Knex.QueryBuilder} querySet
   * @param {AuthQueryPlan} step
   */
  private secure(querySet: Knex.QueryBuilder, step: AuthQueryPlan) {
    if (step.filters) {
      if (step.filters.where) querySet.where(...step.filters.where);
      if (step.filters.whereNot) querySet.whereNot(...step.filters.whereNot);
    }
    step.children.forEach((c) => {
      const joinedF = typeof c.fk === 'string' ? c.fk : c.fk[0];
      const parentF = typeof c.fk === 'string' ? c.fk : c.fk[1];
      const r = this.knex.ref(`${step.table}.${parentF}`);
      const sq = [
        this.knex
          .withSchema(this.schema)
          .select(joinedF)
          .from(c.table)
          .where(joinedF, r)
          .limit(1),
        this.knex
          .withSchema(this.schema)
          .select(joinedF)
          .from(c.table)
          .where(joinedF, r)
          .limit(1),
      ];
      this.secure(sq[1], c);
      querySet.andWhere(function () {
        if (c.required) {
          this.whereExists(sq[1]);
        } else {
          this.whereNotExists(sq[0]).orWhereExists(sq[1]);
        }
      });
    });
  }
}

/**
 * WasteWaterAPI
 *
 * @export
 * @class WasteWaterAPI
 * @typedef {WasteWaterAPI}
 * @extends {SQLDataSource}
 */
export class WasteWaterAPI extends SQLDataSource {
  /**
   * Knex configuration
   *
   * @private
   * @type {any}
   */
  private conf;
  /**
   * Creates an instance of WasteWaterAPI.
   *
   * @constructor
   * @public
   * @param {*} conf
   */
  public constructor(conf: any) {
    super(conf);
    this.conf = conf;
  }
  /**
   * Returns the knex instance.
   *
   * @private
   * @returns {Knex}
   */
  private getKnex() {
    return this.knex;
  }
  /**
   * Perform a standard graphQL query on the SQL database.
   *
   * @private
   * @param {TableName} table
   * @param {FilteredFields} filter
   * @param {AuthContext} context
   * @param {?readonly [string, string][]} [columnMaps]
   * @param {?boolean} [first]
   * @returns {*}
   */
  private standardQuery(
    table: TableName,
    filter: FilteredFields,
    context: AuthContext,
    columnMaps?: readonly [string, string][],
    first?: boolean
  ) {
    const qs = new QuerySet(
      this.getKnex(),
      table,
      this.conf.schema,
      context,
      columnMaps,
      first
    );

    return qs.applyFilter(filter).catch((e) => {
      if (process.env.NODE_ENV === 'production') {
        throw new Error('[E001] Error executing this query.');
      }
      throw e;
    });
  }
  /**
   * Return all results
   *
   * @public
   * @param {TableName} table
   * @param {*} args
   * @param {(AuthContext & DatasourceContext)} context
   * @param {?readonly [string, string][]} [columnMaps]
   * @returns {*}
   */
  public get(
    table: TableName,
    args: any,
    context: AuthContext & DatasourceContext,
    columnMaps?: readonly [string, string][]
  ) {
    return this.standardQuery(table, args.filter, context, columnMaps);
  }
  /**
   * Return first result.
   *
   * @public
   * @param {TableName} table
   * @param {*} args
   * @param {(AuthContext & DatasourceContext)} context
   * @param {?readonly [string, string][]} [columnMaps]
   * @returns {*}
   */
  public first(
    table: TableName,
    args: any,
    context: AuthContext & DatasourceContext,
    columnMaps?: readonly [string, string][]
  ) {
    return this.standardQuery(table, args.filter, context, columnMaps, true);
  }
}

export default new WasteWaterAPI(database);
