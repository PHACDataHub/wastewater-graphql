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
