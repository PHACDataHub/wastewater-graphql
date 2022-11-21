import { ApolloServer } from 'apollo-server-azure-functions';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

import { DateTimeResolver } from 'graphql-scalars';

import auth from './auth';
import wasteWaterAPI from './api';
import typeDefs from './schema';
import resolvers from './resolvers';

// Create our server.
const server = new ApolloServer({
  typeDefs,
  resolvers: {
    DateTime: DateTimeResolver,
    ...resolvers,
  },
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  dataSources: () => ({
    wasteWater: wasteWaterAPI,
  }),
  introspection: true,
  context: auth,
});

exports.graphqlHandler = server.createHandler();
