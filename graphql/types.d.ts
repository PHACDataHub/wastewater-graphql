type AuthContext =
  | {
      authenticated: false;
    }
  | { authenticated: true; filters: AuthFilters };

type AuthFilter = {
  readonly where?: [any, any];
  readonly whereNot?: [any, any];
};

type AuthFilters = {
  readonly [table in TableName]?: AuthFilter;
};

type ResolverFunc = (
  parent: any,
  args: any,
  context: AuthContext & DatasourceContext
) => Promise<any>;

type Resolvers = {
  [schemaType: string]: {
    [key: string]: ResolverFunc;
  };
};
