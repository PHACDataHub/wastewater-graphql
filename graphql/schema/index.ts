import { readFileSync, readdirSync } from 'fs';
import * as path from 'path';

// Load the schema into memory
export const SCHEMA_DIR = path.resolve(__dirname);
const schemaFiles = readdirSync(SCHEMA_DIR);
console.log(schemaFiles);
const typeDefs = schemaFiles
  .map((filename) => {
    if (filename.endsWith('.graphql')) {
      return readFileSync(path.join(SCHEMA_DIR, filename)).toString('utf-8');
    }
    return '';
  })
  .join('\n');

export default typeDefs;
