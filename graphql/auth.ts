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
    datasets: {
      whereNot: ['datasetID', 'NML-WWMPOX'],
    },
    wastewatermpox: {
      where: ['Location', 'thisiddoesnotexist'],
    },
  },
  bccdc: {
    sites: {
      where: ['healthReg', 'Vancouver'],
    },
    datasets: {
      whereIn: ['datasetID', ['BCCDC', 'NML-WWPCR']],
      whereNot: ['datasetID', 'NML-WWMPOX'],
    },
    wastewatermpox: {
      where: ['Location', 'thisiddoesnotexist'],
    },
  },
  hnj: {
    sites: {
      whereIn: ['healthReg', ['Whitehorse', 'Haines Junction']],
    },
    datasets: {
      whereIn: ['datasetID', ['NML-WWPCR', 'NML-GXWW', 'onsite-GXWW']],
      whereNot: ['datasetID', 'NML-WWMPOX'],
    },
    wastewatermpox: {
      where: ['Location', 'thisiddoesnotexist'],
    },
  },
  pho: { // MOH is using this as well
    sites:{
      whereIn: ['healthReg', ['Dryden', 'Kenora', 'Toronto']]
    },
    datasets: {
      whereNotIn: ['datasetID', ['NML-WWMPOX', 'OMECP']],
    },
    measures: {
      whereIn: ['measure', ["covN2", "covN200U", "fluA", "fluB", "rsvA", "rsvB", "flowVol"]]
    },
    wastewatermpox: {
      where: ['Location', 'thisiddoesnotexist'],
    },
  },
  omecp: { // as OMECP conditions TBD, use OMECP group as TPH group and rename afterwards
    // TPH conditions
    sites:{
      whereIn: ['healthReg', ['Toronto']]
    },
    datasets: {
      whereNotIn: ['datasetID', ['NML-WWMPOX', 'OMECP']],
    },
    measures: {
      whereIn: ['measure', ["covN2", "covN200U", "fluA", "fluB", "rsvA", "rsvB", "flowVol"]]
    },
    wastewatermpox: {
      where: ['Location', 'thisiddoesnotexist'],
    },
  },
  open: {
    sites: {
      where: ['siteID', 'thisiddoesnotexist'],
    },
    wastewatermpox: {
      where: ['Location', 'thisiddoesnotexist'],
    },
  },
  mb:{
    sites:{
      whereIn: ['siteID', ['THM, WPG-W, WPG-S, WPG-N, FLN, BDN']]
    },
    measures: {
      whereIn: ['measure', ["covN2", "fluA", "fluB", "rsvA", "rsvB"]]
    },
    wastewatermpox: {
      where: ['Location', 'thisiddoesnotexist'],
    },
  }
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
  if (!header) return { authenticated: true, filters: groups["open"] };

  // if group is valid, setup appropriate authorization context.
  if (header in groups) {
    return { authenticated: true, filters: groups[header] };
  }

  // Otherwise, no access.
  return {authenticated: true, filters: groups["open"]}
  // return { authenticated: false };
};

export default AuthContextFunction;
