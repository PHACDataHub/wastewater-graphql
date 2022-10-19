export type ResolverFunc = (
  parent: any,
  args: any,
  context: AuthContext & DatasourceContext
) => Promise<any>;

export type Resolvers = {
  [schemaType: string]: {
    [key: string]: ResolverFunc;
  }
};
