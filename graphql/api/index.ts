import { SQLDataSource } from 'datasource-sql';
import { Knex } from 'knex';
import { AuthContext, TableKeys } from '../auth';

import { database } from '../config';

export type DatasourceContext = {
  dataSources: {
    wasteWater: WasteWaterAPI;
  };
};

export class QuerySet {
  private querySet;
  public constructor(knex: Knex, table: TableName, auth: AuthContext) {
    this.querySet = knex.select('*').from(table);
    if (Object.keys(auth.grants).includes(table)) {
      const allowedValues = auth.grants[table];
      if ((allowedValues?.length || 0) > 0 && !allowedValues?.includes('*')) {
        this.querySet.where((q) => {
          let qu = q;
          allowedValues?.forEach((v, idx) => {
            qu =
              idx === 0
                ? qu.where(TableKeys[table], v)
                : qu.orWhere(TableKeys[table], v);
          });
        });
      }
    }
  }
  public applyFilter(filter: FilteredFields) {
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
    console.log(this.querySet.toSQL().toNative());
    return this.querySet;
  }
}

const valid = (p: any) => typeof p !== 'undefined' && p !== null;
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
    context: AuthContext
  ) {
    const qs = new QuerySet(this.getKnex(), table, context);

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
    context: AuthContext & DatasourceContext
  ) {
    return this.standardQuery(table, args.filter, context);
  }
}

export default new WasteWaterAPI(database);
