import { ContextFunction, HttpQueryRequest } from 'apollo-server-core';
import { verify } from 'jsonwebtoken';

const privateKey = '123412341234123412341234';

type TableLevelAuthFilters = {
  [key in TableName]?: string[];
};

export const TableKeys: { [key in TableName]: string } = {
  addresses: 'addID',
  contacts: 'contID',
  datasets: 'dataID',
  instruments: 'instID',
  languageLUs: 'langID',
  measures: 'measRepID',
  measureSets: 'MeasSetRepID',
  methodSets: 'mSRID',
  methodSteps: 'stepID',
  organizations: 'orgID',
  partLUs: 'partID',
  polygons: 'polygonID',
  samples: 'parSampID',
  setLUs: 'setID',
  sites: 'siteID',
  translationLUs: 'langID',
};

export interface AuthContext {
  authenticated: boolean;
  grants: TableLevelAuthFilters;
}

const AuthContextFunction: ContextFunction<any, AuthContext> = (
  request: HttpQueryRequest
) => {
  const headers = request.request.headers as any;
  const header = headers.authorization;
  if (!header) return { authenticated: false, grants: {} };
  const token: any = header.split(' ');
  if (!token) return { authenticated: false, grants: {} };

  let decodeToken: any;

  try {
    decodeToken = verify(token[1], Buffer.from(privateKey, 'base64'));
    if (
      !decodeToken.api ||
      typeof decodeToken.api !== 'string' ||
      !decodeToken.api.split(',').includes('ww') ||
      !decodeToken.aud ||
      decodeToken.aud !== 'api-ipa-dt.hc-sc.gc.ca'
    )
      return { authenticated: false, grants: {} };
  } catch (err) {
    return { authenticated: false, grants: {} };
  }

  // in case any error found
  if (!!!decodeToken) return { authenticated: false, grants: {} };

  // token decoded successfully, extract data
  const grantsFromToken =
    decodeToken.grants || ({} as { [key in TableName]?: string[] });
  const grants: { [key in TableName]?: string[] } = {};

  let k: keyof typeof TableKeys;
  for (k in TableKeys) {
    if (k in grantsFromToken) {
      grants[k] = [];
      if (typeof grantsFromToken[k] === 'string') {
        grants[k] = grantsFromToken[k].split(',');
      }
    }
  }

  return { authenticated: true, grants };
};

export default AuthContextFunction;
