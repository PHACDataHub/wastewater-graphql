import { ResolverFunc } from '../types';
import { tableRelationships } from './relationships';
import {
  FilteredFields,
  TableName,
  ApiResolver,
  WithResolverCallBack,
} from './types';

/**
 * Convenience function which appends the provided filters to an object's
 * existing `filter` object. 
 *
 * @param {*} args
 * @param {FilteredFields} appended
 * @returns {*}
 */
const argsWithAppendedFilter = (args: any, appended: FilteredFields) => ({
  ...args,
  filter: Object.assign({}, args.filter, {
    ...appended,
  }),
});

/**
 * Convenience function that returns a relationship pair that will not impact
 * the query, for when no relationship exists.
 *
 * @param {TableName} source
 * @returns {([TableName, string | [string, string]])}
 */
const emptyRelationship = (
  source: TableName
): [TableName, string | [string, string]] => [source, ['["1"]', '["2"]']];

/**
 * Returns the relationship (if any) between 2 tables.  Using the information
 * from relationships.ts, when a GraphQL query accesses related data, the
 * relationship pair is used to produce the appropriate JOIN.
 *
 * @param {TableName} source
 * @param {TableName} table
 * @param {?string} [property]
 * @returns {([TableName, string | [string, string]])}
 */
export const relPair = (
  source: TableName,
  table: TableName,
  property?: string
): [TableName, string | [string, string]] => {
  const relationship = tableRelationships[source];
  if (!relationship) return emptyRelationship(source);
  if (relationship) {
    const pairs = relationship.find((r) => r.table === table);
    if (!pairs) return emptyRelationship(source);
    if (property && !('properties' in pairs)) return emptyRelationship(source);
    if (property && 'properties' in pairs) {
      const prop = pairs.properties.find((prop) => prop.property === property);
      if (!prop) return emptyRelationship(source);
      return [table, prop.foreignKeys];
    }
    if ('foreignKeys' in pairs) {
      return [table, pairs.foreignKeys];
    }
  }
  return emptyRelationship(source);
};

/**
 * Convenience function used to translate graphQL queries to SQL queries.
 * 
 * @param {*} name
 * @param {*} rule
 * @param {*} columnMaps
 * @param {*} single
 * @returns {(parent: any, args: any, context: any) => any}
 */
export const apiResolver: ApiResolver =
  (name, rule, columnMaps, single) => (parent, args, context) => {
    const newArgs =
      typeof rule === 'string'
        ? argsWithAppendedFilter(args, { [rule]: { is: parent[rule] } })
        : Array.isArray(rule)
        ? argsWithAppendedFilter(args, { [rule[0]]: { is: parent[rule[1]] } })
        : rule
        ? argsWithAppendedFilter(args, rule(parent, args))
        : args;
    if (single) {
      return context.dataSources.wasteWater.first(
        name,
        newArgs,
        context,
        columnMaps
      );
    }
    return context.dataSources.wasteWater.get(
      name,
      newArgs,
      context,
      columnMaps
    );
  };

/**
 * Returns a single record
 *
 * @param {*} name
 * @param {*} rule
 * @param {*} columnMaps
 * @returns {*}
 */
export const apiSingleResolver: ApiResolver = (name, rule, columnMaps) =>
  apiResolver(name, rule, columnMaps, true);

/**
 * Returns resolver function for single record, with parent/child relationships
 *
 * @param {TableName} parent
 * @param {TableName} table
 * @param {?string} [property]
 * @returns {*}
 */
export const getSingleResolver = (
  parent: TableName,
  table: TableName,
  property?: string
) => {
  return apiSingleResolver(...relPair(parent, table, property));
};

/**
 * Returns resolver function for lists, with parent/child relationships.
 *
 * @param {TableName} parent
 * @param {TableName} table
 * @param {?string} [property]
 * @returns {*}
 */
export const getResolver = (
  parent: TableName,
  table: TableName,
  property?: string
) => {
  return apiResolver(...relPair(parent, table, property));
};

/**
 * Convenience function which provides both a single and list resolver for a
 * given "parent" relationship.
 *
 * @param {TableName} parent
 * @returns {(cb: any) => { [key: string]: any; }}
 */
export const withParentResolver =
  (parent: TableName) =>
  (
    cb: WithResolverCallBack
  ): {
    [key: string]: ResolverFunc;
  } => {
    return cb({
      single: (table: TableName, property?: string) =>
        getSingleResolver(parent, table, property),
      list: (table: TableName, property?: string) =>
        getResolver(parent, table, property),
    });
  };
