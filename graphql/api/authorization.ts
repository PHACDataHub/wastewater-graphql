import { AuthContext } from '../types';
import { tableRelantionships } from './relationships';
import { AuthQueryPlan, TableName, AuthQueryPlanChild } from './types';

const countFilters = (obj: AuthQueryPlan): number => {
  return obj.children.reduce(
    (p, c) => p + countFilters(c),
    obj.filters ? Object.keys(obj.filters).length : 0
  );
};

export const optimizeQueryPlan = (obj: AuthQueryPlan): AuthQueryPlan => {
  return Object.assign(obj, {
    children: obj.children
      .filter((c) => countFilters(c) > 0)
      .map((c) => optimizeQueryPlan(c)),
  });
};

export const createAuthorizationPlan = (
  auth: AuthContext,
  table: TableName
) => {
  return optimizeQueryPlan(buildAuthQueryPlan(auth, table));
};

export const buildAuthQueryPlan: (
  auth: AuthContext,
  table: TableName,
  step?: AuthQueryPlan,
  depth?: number | false
) => AuthQueryPlan = (
  auth,
  table,
  step = {
    key: table,
    table,
    filters: {},
    children: [],
    parent: null,
    depth: 0,
  },
  depth = false
) => {
  if (!auth.authenticated) {
    // Unauthenticated users cannot query anything.
    step.filters = { where: [1, 2] };
    return step;
  }
  if (table in auth.filters) {
    step.filters = auth.filters[table];
  }
  const findKey = (step: AuthQueryPlan, key: string): boolean => {
    if (step.key === key) return true;
    if (step.parent !== null) return findKey(step.parent, key);
    return false;
  };

  // Check relationship permissions
  if (table in tableRelantionships) {
    const j = tableRelantionships[table];
    if (j) {
      j.filter(
        (joinConf) =>
          typeof joinConf.auth !== 'undefined' && (depth === false || depth > 0)
      ).forEach((joinConf) => {
        if (typeof joinConf.auth === 'undefined') return; // typeguard
        const joinTable = joinConf.table;
        if ('foreignKeys' in joinConf) {
          const key = `${table}__${
            typeof joinConf.foreignKeys === 'string'
              ? `${joinConf.foreignKeys}_${joinConf.foreignKeys}`
              : `${joinConf.foreignKeys[0]}_${joinConf.foreignKeys[1]}`
          }__${joinTable}`;
          if (!findKey(step, key)) {
            const childStep: AuthQueryPlanChild = {
              key,
              table: joinTable,
              filters: {},
              children: [],
              fk: joinConf.foreignKeys,
              parent: step,
              required: joinConf.auth.required,
              depth: depth === false ? joinConf.auth.depth : depth,
            };
            step.children.push(childStep);
            buildAuthQueryPlan(
              auth,
              joinTable,
              childStep,
              depth === false ? joinConf.auth.depth - 1 : depth - 1
            );
          }
        }
      });
    }
  }

  return step;
};
