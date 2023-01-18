import { ContextFunction, HttpQueryRequest } from 'apollo-server-core';
import { AuthFilters, AuthContext } from './types';

// List of authorizations
export const groups: { readonly [authGroup: string]: AuthFilters } = {
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
  hnj: {
    sites: {
      where: ['siteID', 'HNJ'],
    },
    datasets: {
      where: ['dataID', 'NML-WWPCR'],
    },
  },
};

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
