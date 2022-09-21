import { SQLDataSource } from 'datasource-sql';

import { database } from '../config';

export class QuerySet {
  private querySet;
  public constructor(knex, table: TableName) {
    this.querySet = knex.select('*').from(table);
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
          this.querySet.where(k, '>', params.greaterThan);
        }
        if ('lesserThan' in params && valid(params.lesserThan)) {
          this.querySet.where(k, '<', params.lesserThan);
        }
        if (
          'greaterOrEqualThan' in params &&
          valid(params.greaterOrEqualThan)
        ) {
          this.querySet.where(k, '>=', params.greaterOrEqualThan);
        }
        if ('lesserOrEqualThan' in params && valid(params.lesserOrEqualThan)) {
          this.querySet.where(k, '<=', params.lesserOrEqualThan);
        }
      }
    }
    return this.querySet;
  }
}

const valid = (p) => typeof p !== 'undefined' && p !== null;
export class WasteWaterAPI extends SQLDataSource {
  private conf;
  public constructor(conf) {
    super(conf);
    this.conf = conf;
  }
  private getKnex() {
    return this.knex.withSchema(this.conf.schema);
  }
  private standardQuery(table: TableName, filter: FilteredFields) {
    const qs = new QuerySet(this.getKnex(), table);
    return qs.applyFilter(filter).catch((e) => {
      if (process.env.NODE_ENV === 'production') {
        throw new Error('[E001] Error executing this query.');
      }
      throw e;
    });
  }
  public getAddresses(args) {
    return this.standardQuery('addresses', args.filter);
  }
  public getOrganizations(args) {
    return this.standardQuery('organizations', args.filter);
  }
  public getDatasets(args) {
    return this.standardQuery('datasets', args.filter);
  }
  public getPolygons(args) {
    return this.standardQuery('polygons', args.filter);
  }
  public getInstruments(args) {
    return this.standardQuery('instruments', args.filter);
  }
  public getSetLUs(args) {
    return this.standardQuery('setLUs', args.filter);
  }
  public getPartLUs(args) {
    return this.standardQuery('partLUs', args.filter);
  }
  public getContacts(args) {
    return this.standardQuery('contacts', args.filter);
  }
  public getMethodSteps(args) {
    return this.standardQuery('methodSteps', args.filter);
  }
  public getMethodSets(args) {
    return this.standardQuery('methodSets', args.filter);
  }
  public getMeasureSets(args) {
    return this.standardQuery('measureSets', args.filter);
  }
  public getLanguageLUs(args) {
    return this.standardQuery('languageLUs', args.filter);
  }
  public getTranslationLUs(args) {
    return this.standardQuery('translationLUs', args.filter);
  }
  public getSamples(args) {
    return this.standardQuery('samples', args.filter);
  }
  public getSites(args) {
    return this.standardQuery('sites', args.filter);
  }
  public getMeasures(args) {
    return this.standardQuery('measures', args.filter);
  }
}

export default new WasteWaterAPI(database);
