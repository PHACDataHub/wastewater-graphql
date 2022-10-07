import { ApolloServer } from 'apollo-server-azure-functions';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

import wasteWaterAPI from './api';
import typeDefs from './schema';

const resolvers = {
    Query: {
      _version() {
        return 'muffin';
      },
      addresses(_: any, args: any, { dataSources }: any) {
        return dataSources.wasteWater.getAddresses(args);
      },
      organizations(_: any, args: any, { dataSources }: any) {
        return dataSources.wasteWater.getOrganizations(args);
      },
      datasets(_: any, args: any, { dataSources }: any) {
        return dataSources.wasteWater.getDatasets(args);
      },
      polygons(_: any, args: any, { dataSources }: any) {
        return dataSources.wasteWater.getPolygons(args);
      },
      instruments(_: any, args: any, { dataSources }: any) {
        return dataSources.wasteWater.getInstruments(args);
      },
      setLUs(_: any, args: any, { dataSources }: any) {
        return dataSources.wasteWater.getSetLUs(args);
      },
      partLUs(_: any, args: any, { dataSources }: any) {
        return dataSources.wasteWater.getPartLUs(args);
      },
      contacts(_: any, args: any, { dataSources }: any) {
        return dataSources.wasteWater.getContacts(args);
      },
      methodSteps(_: any, args: any, { dataSources }: any) {
        return dataSources.wasteWater.getMethodSteps(args);
      },
      methodSets(_: any, args: any, { dataSources }: any) {
        return dataSources.wasteWater.getMethodSets(args);
      },
      measureSets(_: any, args: any, { dataSources }: any) {
        return dataSources.wasteWater.getMeasureSets(args);
      },
      languageLUs(_: any, args: any, { dataSources }: any) {
        return dataSources.wasteWater.getLanguageLUs(args);
      },
      translationLUs(_: any, args: any, { dataSources }: any) {
        return dataSources.wasteWater.getTranslationLUs(args);
      },
      samples(_: any, args: any, { dataSources }: any) {
        return dataSources.wasteWater.getSamples(args);
      },
      sites(_: any, args: any, { dataSources }: any) {
        return dataSources.wasteWater.getSites(args);
      },
      measures(_: any, args: any, { dataSources }: any) {
        return dataSources.wasteWater.getMeasures(args);
      },
    },
  };
// Create our server.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
  dataSources: () => ({
    wasteWater: wasteWaterAPI,
  }),
  introspection: true,
});

exports.graphqlHandler = server.createHandler();
