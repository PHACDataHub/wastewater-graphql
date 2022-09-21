# WasteWater GraphQL API

## Environment

The following environment variables must be defined:

- DB_CONNECTION_STRING

OR

- DB_HOST
- DB_USER
- DB_PASSWORD
- DB_DATABASE

## Generating the schema

The helper utility `generate_schema.js` can be used to extract all the tables
from the configured database.  The resulting schema must then be manually
implemented or updated in the `src/schema` directory.
