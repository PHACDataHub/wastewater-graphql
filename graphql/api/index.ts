import { SQLDataSource } from 'datasource-sql';
import { Knex } from 'knex';
import { AuthContext } from '../auth';

import { database } from '../config';

const tableColumnMaps: TableColumnMaps = {
  methodSets: [
    ['methSetID (CK)', 'methSetID_CK'],
    ['stepIndexID (CK)', 'stepIndexID_CK'],
  ],
};

export class QuerySet {
  private querySet;
  public constructor(
    knex: Knex,
    table: TableName,
    auth: AuthContext,
    columnMaps?: readonly [string, string][],
    first?: boolean
  ) {
    if (!auth.authenticated) {
      this.querySet = null;
    } else {
      const aliases = (tableColumnMaps[table] || [])
        .concat(Array.isArray(columnMaps) ? columnMaps : [])
        .map((cm) => `${cm[0]} as ${cm[1]}`);

      this.querySet = first
        ? knex.first('*', ...aliases).from(table)
        : knex.select('*', ...aliases).from(table);
      if (table in auth.filters) {
        const filters = auth.filters[table];
        if (filters) {
          if (filters.where) this.querySet.where(...filters.where);
          if (filters.whereNot) this.querySet.whereNot(...filters.whereNot);
        }
      }
    }
  }
  public applyFilter(filter: FilteredFields) {
    if (this.querySet === null) return new Promise((resolve) => resolve([]));
    if (filter && typeof filter === 'object') {
      for (const k of Object.keys(filter)) {
        const params = filter[k];
        if ('is' in params && valid(params.is)) {
          this.querySet.where(k, params.is);
        }
        if ('contains' in params && valid(params.contains)) {
          this.querySet.where(k, 'like', `%${params.contains}%`);
        }
        if ('startsWith' in params && valid(params.startsWith)) {
          this.querySet.where(k, 'like', `${params.startsWith}%`);
        }
        if ('endsWith' in params && valid(params.endsWith)) {
          this.querySet.where(k, 'like', `%${params.endsWith}`);
        }
        if ('greaterThan' in params && valid(params.greaterThan)) {
          this.querySet.where(k, '>', params.greaterThan || 0);
        }
        if ('lesserThan' in params && valid(params.lesserThan)) {
          this.querySet.where(k, '<', params.lesserThan || 0);
        }
        if (
          'greaterOrEqualThan' in params &&
          valid(params.greaterOrEqualThan)
        ) {
          this.querySet.where(k, '>=', params.greaterOrEqualThan || 0);
        }
        if ('lesserOrEqualThan' in params && valid(params.lesserOrEqualThan)) {
          this.querySet.where(k, '<=', params.lesserOrEqualThan || 0);
        }
      }
    }
    // console.log(this.querySet.toSQL().sql);
    return this.querySet;
  }
}

const valid = (p: any) => true; //typeof p !== 'undefined' && p !== null;
export class WasteWaterAPI extends SQLDataSource {
  private conf;
  public constructor(conf: any) {
    super(conf);
    this.conf = conf;
  }
  private getKnex() {
    return this.knex.withSchema(this.conf.schema) as any;
  }
  private standardQuery(
    table: TableName,
    filter: FilteredFields,
    context: AuthContext,
    columnMaps?: readonly [string, string][],
    first?: boolean
  ) {
    const qs = new QuerySet(this.getKnex(), table, context, columnMaps, first);

    return qs.applyFilter(filter).catch((e) => {
      if (process.env.NODE_ENV === 'production') {
        throw new Error('[E001] Error executing this query.');
      }
      throw e;
    });
  }
  public get(
    table: TableName,
    args: any,
    context: AuthContext & DatasourceContext,
    columnMaps?: readonly [string, string][]
  ) {
    return this.standardQuery(table, args.filter, context, columnMaps);
  }
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
