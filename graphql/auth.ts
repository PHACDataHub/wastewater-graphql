import { ContextFunction } from '@apollo/server';
import { AuthFilters, AuthContext } from './types';
import { AzureFunctionsContextFunctionArgument } from '@as-integrations/azure-functions';

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
    sites: {
      where: ['healthReg', 'Vancouver'],
    },
    datasets: {
      whereIn: ['dataID', ['BCCDC', 'NML-WWPCR']],
    },
  },
  hnj: {
    sites: {
      whereIn: ['healthReg', ['Whitehorse', 'Haines Junction']],
    },
    datasets: {
      whereIn: ['dataID', ['NML-WWPCR', 'NML-WWGX']],
    },
  },
};

/**
 * Determines the authorization context of a request.
 *
 * @param {AzureFunctionsContextFunctionArgument} request
 * @returns
 *  | { authenticated: boolean; filters?: undefined }
 *  | { authenticated: boolean; filters: any } = {};
 */
const AuthContextFunction = (
  request: AzureFunctionsContextFunctionArgument
) => {
  const headers = request.req.headers as any;

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
