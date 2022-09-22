import * as dotenv from 'dotenv';

dotenv.config();

export const database = {
  client: 'mssql',
  schema: 'wastewater',
  connection: process.env.DB_CONNECTION_STRING
    ? {
        connectionString: process.env.DB_CONNECTION_STRING,
      }
    : {
        host: process.env.DB_HOST,
        port : 1433,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        options: {  
          encrypt: true
      }
      },
};
