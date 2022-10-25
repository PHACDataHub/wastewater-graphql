const argsWithAppendedFilter = (args: any, appended: FilteredFields) => ({
  ...args,
  filter: Object.assign({}, args.filter, {
    ...appended,
  }),
});

export const apiResolver: ApiResolver =
  (name, rule, columnNaps, single) => (parent, args, context) => {
    const newArgs =
      typeof rule === 'string'
        ? argsWithAppendedFilter(args, { [rule]: { is: parent[rule] } })
        : Array.isArray(rule)
        ? argsWithAppendedFilter(args, { [rule[0]]: { is: parent[rule[1]] } })
        : rule
        ? argsWithAppendedFilter(args, rule(parent, args))
        : args;
    if (single) {
      return context.dataSources.wasteWater.first(name, newArgs, context);
    }
    return context.dataSources.wasteWater.get(name, newArgs, context);
  };

export const apiSingleResolver: ApiResolver = (name, rule, columnMaps) =>
  apiResolver(name, rule, columnMaps, true);
