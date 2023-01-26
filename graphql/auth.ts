import { ContextFunction, HttpQueryRequest } from 'apollo-server-core';
import { AuthFilters, AuthContext } from './types';

/**
 * List of authorization groups, and their access filters.
 *
 * @type {{ readonly [authGroup: string]: AuthFilters }}
 */
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
      whereIn: ['dataID', ['NML-WWPCR', 'NML-WWGX']],
    },
  },
};

/**
 * Determines the authorization context of a request.
 *
 * @param {HttpQueryRequest} request
 * @returns {({ authenticated: boolean; filters?: undefined; } | { authenticated: boolean; filters: any; })}
 */
const AuthContextFunction: ContextFunction<any, AuthContext> = (
  request: HttpQueryRequest
) => {
  const headers = request.request.headers as any;

  // No access without a specified group.
  const header = headers['x-auth-group'];
  if (!header) return { authenticated: false };

  // if group is valid, setup appropriate authorization context.
  if (header in groups) {
    return { authenticated: true, filters: groups[header] };
  }

  // Otherwise, no access.
  return { authenticated: false };
};

export default AuthContextFunction;
