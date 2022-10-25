import { tableRelantionships } from './relationships';

const argsWithAppendedFilter = (args: any, appended: FilteredFields) => ({
  ...args,
  filter: Object.assign({}, args.filter, {
    ...appended,
  }),
});

const emptyRelationship = (
  source: TableName
): [TableName, string | [string, string]] => [source, ['["1"]', '["2"]']];

export const relPair = (
  source: TableName,
  table: TableName,
  property?: string
): [TableName, string | [string, string]] => {
  const relationship = tableRelantionships[source];
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

export const apiSingleResolver: ApiResolver = (name, rule, columnMaps) =>
  apiResolver(name, rule, columnMaps, true);

export const getSingleResolver = (
  parent: TableName,
  table: TableName,
  property?: string
) => {
  return apiSingleResolver(...relPair(parent, table, property));
};

export const getResolver = (
  parent: TableName,
  table: TableName,
  property?: string
) => {
  return apiResolver(...relPair(parent, table, property));
};

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
