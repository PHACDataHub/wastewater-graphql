import * as dotenv from 'dotenv';
import { Knex } from 'knex';

dotenv.config();

// List of accepted values for authentication type.
const validTypes: Knex.MsSqlAuthenticationTypeOptions[] = [
  'default',
  'ntlm',
  'azure-active-directory-password',
  'azure-active-directory-access-token',
  'azure-active-directory-msi-vm',
  'azure-active-directory-msi-app-service',
  'azure-active-directory-service-principal-secret',
];

if (!process.env.DB_DATABASE) {
  throw new Error('The environment variable DB_DATABASE is required.');
}

if (!process.env.DB_HOST) {
  throw new Error('The environment variable DB_HOST is required.');
}

let type: Knex.MsSqlAuthenticationTypeOptions | undefined = undefined;
if (process.env.DB_AUTH_TYPE) {
  if (process.env.DB_AUTH_TYPE || '' in validTypes) {
    type = process.env.DB_AUTH_TYPE as Knex.MsSqlAuthenticationTypeOptions;
  } else {
    throw new Error(
      `Invalid value for DB_AUTH_TYPE, accepted values are: ${validTypes.join(
        ' ,'
      )}`
    );
  }
}

const connection: Knex.StaticConnectionConfig = {
  server: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '1433'),
  database: process.env.DB_DATABASE,
  userName: process.env.DB_USER || undefined,
  password: process.env.DB_PASSWORD || undefined,
  type,
  options: {
    encrypt: true,
  },
};

export const database = {
  client: 'mssql',
  schema: 'wastewater',
  connection,
};
