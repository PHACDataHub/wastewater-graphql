/**
 * Main server entrypoint
 */
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateHandler } from '@as-integrations/azure-functions';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { DateTimeResolver } from 'graphql-scalars';

import auth from './auth';
import { database } from './config';
import { WasteWaterAPI } from './api';
import typeDefs from './schema';
import resolvers from './resolvers';

/**
 * Create our server.
 *
 * @type {ApolloServer}
 */
const server = new ApolloServer({
  typeDefs,
  resolvers: {
    DateTime: DateTimeResolver,
    ...resolvers,
  },
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  introspection: true,
});

const knexConfig = database;

export default startServerAndCreateHandler(server, {
  context: async (req) => {
    const { cache } = server;
    return {
      ...(await auth(req)),
      dataSources: {
        wasteWater: new WasteWaterAPI({ knexConfig, cache }),
      },
    };
  },
});
