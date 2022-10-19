/**
 * Utility function used to generate an initial GraphQL schema
 * from an existing SQL database.
 * 
 * Prerequisites: npm install --no-save db2graphql
 * 
 */
const knex = require('knex');
// eslint-disable-next-line import/no-extraneous-dependencies
const Db2g = require('db2graphql');
const dotenv = require('dotenv');

dotenv.config();

const conf = {
  client: 'mssql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    options: {
      encrypt: true,
    },
  },
};

const conn = knex(conf);
const api = new Db2g('wastewater', conn);
api.connect('wastewater').then(() => {
  const schema = api.getSchema();
  console.log(schema);
  conn.destroy();
});
