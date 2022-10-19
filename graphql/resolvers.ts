import { DatasourceContext } from './api';
import { AuthContext } from './auth';
import { Resolvers } from './types';

const argsWithAppendedFilter = (args: any, appended: FilteredFields) => ({
  ...args,
  filter: Object.assign({}, args.filter, {
    ...appended,
  }),
});

const nestedResolver =
  (
    name: TableName,
    rule: (parent: any, args: any) => FilteredFields,
    single?: boolean
  ) =>
  (parent: any, args: any, context: AuthContext & DatasourceContext) => {
    const newArgs = argsWithAppendedFilter(args, rule(parent, args));
    if (single) {
      return context.dataSources.wasteWater.first(name, newArgs, context);
    }
    return context.dataSources.wasteWater.get(name, newArgs, context);
  };

const nestedSingleResolver = (
  name: TableName,
  rule: (parent: any, args: any) => FilteredFields
) => nestedResolver(name, rule, true);

const resolvers: Resolvers = {
  Datasets: {
    funder: nestedSingleResolver('organizations', (dataset) => ({
      orgID: { is: dataset.funderID },
    })),
    custody: nestedSingleResolver('organizations', (dataset) => ({
      orgID: { is: dataset.custodyID },
    })),
    sites: nestedResolver('sites', (dataset) => ({
      dataID: { is: dataset.dataID },
    })),
    samples: nestedResolver('samples', (dataset) => ({
      dataID: { is: dataset.dataID },
    })),
  },
  Query: {
    // _version() {
    //   return 'muffin';
    // },
    addresses(_, args, context) {
      return context.dataSources.wasteWater.get('addresses', args, context);
    },
    organizations(_, args, context) {
      return context.dataSources.wasteWater.get('organizations', args, context);
    },
    datasets(_, args, context) {
      console.log('-- resolver datasets --');
      return context.dataSources.wasteWater.get('datasets', args, context);
    },
    polygons(_, args, context) {
      return context.dataSources.wasteWater.get('polygons', args, context);
    },
    instruments(_, args, context) {
      return context.dataSources.wasteWater.get('instruments', args, context);
    },
    setLUs(_, args, context) {
      return context.dataSources.wasteWater.get('setLUs', args, context);
    },
    partLUs(_, args, context) {
      return context.dataSources.wasteWater.get('partLUs', args, context);
    },
    contacts(_, args, context) {
      return context.dataSources.wasteWater.get('contacts', args, context);
    },
    methodSteps(_, args, context) {
      return context.dataSources.wasteWater.get('methodSteps', args, context);
    },
    methodSets(_, args, context) {
      return context.dataSources.wasteWater.get('methodSets', args, context);
    },
    measureSets(_, args, context) {
      return context.dataSources.wasteWater.get('measureSets', args, context);
    },
    languageLUs(_, args, context) {
      return context.dataSources.wasteWater.get('languageLUs', args, context);
    },
    translationLUs(
      _: any,
      args: any,
      context: AuthContext & DatasourceContext
    ) {
      return context.dataSources.wasteWater.get(
        'translationLUs',
        args,
        context
      );
    },
    samples(_, args, context) {
      return context.dataSources.wasteWater.get('samples', args, context);
    },
    sites(_, args, context) {
      return context.dataSources.wasteWater.get('sites', args, context);
    },
    measures(_, args, context) {
      return context.dataSources.wasteWater.get('measures', args, context);
    },
  },
};

export default resolvers;
