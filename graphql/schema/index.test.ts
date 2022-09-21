import { readFileSync, readdirSync } from 'fs';
import * as path from 'path';

import { matchers } from 'jest-json-schema';
import { buildSchema } from 'graphql';

import schema, { SCHEMA_DIR } from './index';

expect.extend(matchers);

describe('Schema', () => {
  it('is a string', () => {
    expect(typeof schema).toBe('string');
  });
  it('is a valid schema', () => {
    expect(buildSchema(schema)).toBeValidSchema();
  });
  it('All .graphql files are concatenated into as single schema', () => {
    const schemaFiles = readdirSync(SCHEMA_DIR);
    schemaFiles.forEach((filename) => {
      expect(
        schema.includes(
          readFileSync(path.join(SCHEMA_DIR, filename)).toString('utf-8')
        )
      ).toBe(filename.endsWith('.graphql'));
    });
  });
});
