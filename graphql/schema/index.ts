import { readFileSync, readdirSync } from 'fs';
import * as path from 'path';
import { DateTimeTypeDefinition } from 'graphql-scalars';

// Load the schema into memory
export const SCHEMA_DIR = path.resolve(__dirname);
const schemaFiles = readdirSync(SCHEMA_DIR);
const typeDefs = schemaFiles
  .map((filename) => {
    if (filename.endsWith('.graphql')) {
      return readFileSync(path.join(SCHEMA_DIR, filename)).toString('utf-8');
    }
    return '';
  })
  .concat([DateTimeTypeDefinition])
  .join('\n');

export default typeDefs;
