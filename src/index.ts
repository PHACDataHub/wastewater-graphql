import { readFileSync } from 'fs';

import { ApolloServer } from 'apollo-server-cloud-functions';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

import wasteWaterAPI from './api';
import typeDefs from './schema';

const version = readFileSync(require.resolve('./version.txt')).toString(
  'utf-8'
);

const resolvers = {
  Query: {
    _version() {
      return version;
    },
    addresses(_, args, { dataSources }) {
      return dataSources.wasteWater.getAddresses(args);
    },
    organizations(_, args, { dataSources }) {
      return dataSources.wasteWater.getOrganizations(args);
    },
    datasets(_, args, { dataSources }) {
      return dataSources.wasteWater.getDatasets(args);
    },
    polygons(_, args, { dataSources }) {
      return dataSources.wasteWater.getPolygons(args);
    },
    instruments(_, args, { dataSources }) {
      return dataSources.wasteWater.getInstruments(args);
    },
    setLUs(_, args, { dataSources }) {
      return dataSources.wasteWater.getSetLUs(args);
    },
    partLUs(_, args, { dataSources }) {
      return dataSources.wasteWater.getPartLUs(args);
    },
    contacts(_, args, { dataSources }) {
      return dataSources.wasteWater.getContacts(args);
    },
    methodSteps(_, args, { dataSources }) {
      return dataSources.wasteWater.getMethodSteps(args);
    },
    methodSets(_, args, { dataSources }) {
      return dataSources.wasteWater.getMethodSets(args);
    },
    measureSets(_, args, { dataSources }) {
      return dataSources.wasteWater.getMeasureSets(args);
    },
    languageLUs(_, args, { dataSources }) {
      return dataSources.wasteWater.getLanguageLUs(args);
    },
    translationLUs(_, args, { dataSources }) {
      return dataSources.wasteWater.getTranslationLUs(args);
    },
    samples(_, args, { dataSources }) {
      return dataSources.wasteWater.getSamples(args);
    },
    sites(_, args, { dataSources }) {
      return dataSources.wasteWater.getSites(args);
    },
    measures(_, args, { dataSources }) {
      return dataSources.wasteWater.getMeasures(args);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  dataSources: () => ({
    wasteWater: wasteWaterAPI,
  }),
  introspection: true,
});

exports.handler = server.createHandler();
