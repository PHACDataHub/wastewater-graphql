import { ContextFunction, HttpQueryRequest } from 'apollo-server-core';

// List of authorizations
const groups: { readonly [authGroup: string]: AuthFilters } = {
  'test': {
    sites: {
      where: ['healthReg', 'Edmonton'],
    },
  },
  'nml-lab': {},
  csc: {
    sites: {
      where: ['healthReg', 'CSC'],
    },
  },
  bccdc: {
    datasets: {
      where: ['dataID', 'BCCDC'],
    },
  },
};

// -	NML Lab / Data integration team :  Have Full access to the database
// -	CSC Folks: Have access to only CSC Data -i.e  health Region = CSC
// -	BCCDC Folks soon: Get only BCCDC data. i.e. DatasetID = BCCDC.

const AuthContextFunction: ContextFunction<any, AuthContext> = (
  request: HttpQueryRequest
) => {
  const headers = request.request.headers as any;

  // @todo - Have APIM add a secret key header as well to authorize
  // no secret header? return authenticated: false right away.

  const header = headers['x-auth-group'];
  if (!header) return { authenticated: false };

  if (header in groups) {
    return { authenticated: true, filters: groups[header] };
  }

  return { authenticated: false };
};

export default AuthContextFunction;
