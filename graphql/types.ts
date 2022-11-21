import { DatasourceContext, TableName } from './api/types';

export type AuthContext =
  | {
      authenticated: false;
    }
  | { authenticated: true; filters: AuthFilters };

export type AuthFilter = {
  readonly where?: [any, any];
  readonly whereNot?: [any, any];
};

export type AuthFilters = {
  readonly [table in TableName]?: AuthFilter;
};

export type ResolverFunc = (
  parent: any,
  args: any,
  context: AuthContext & DatasourceContext
) => Promise<any>;

export type Resolvers = {
  [schemaType: string]: {
    [key: string]: ResolverFunc;
  };
};
