import { ContextFunction, HttpQueryRequest } from 'apollo-server-core';

type AuthFilters = {
  readonly [table in TableName]?: {
    readonly where?: [any, any];
    readonly whereNot?: [any, any];
  };
};

const groups: { readonly [authGroup: string]: AuthFilters } = {
  'nml-lab': {
    sites: {
      whereNot: ['siteID', 'HHA'],
    },
  },
  csc: {},
  bccdc: {},
};

// -	NML Lab / Data integration team / Modeling :  Have Full access to the database
// Correct
// -	CSC Folks: Have access to only CSC Data -i.e  health Region = CSC
// Correct
// -	BCCDC Folks soon: Get only BCCDC data. i.e. DatasetID = BCCDC.
// Correct

export type AuthContext =
  | {
      authenticated: false;
    }
  | { authenticated: true; filters: AuthFilters };

const AuthContextFunction: ContextFunction<any, AuthContext> = (
  request: HttpQueryRequest
) => {
  const headers = request.request.headers as any;

  // @todo - Have APIM add a secret key header as well to authorize
  // no secret header? return authenticated: false right away.

  const header = headers['x-auth-group'];
  if (!header) return { authenticated: false };

  if (header in groups) {
    console.log('-- authenticated --');
    return { authenticated: true, filters: groups[header] };
  }

  return { authenticated: false };

};

export default AuthContextFunction;
