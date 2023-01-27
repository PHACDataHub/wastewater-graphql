/**
 * Query authorization
 */
import { AuthContext } from '../types';
import { tableRelationships } from './relationships';
import { AuthQueryPlan, TableName, AuthQueryPlanChild } from './types';

/**
 * Returns the total number of filters of the provided authorization query plan
 * including children.
 *
 * @param {AuthQueryPlan} obj
 * @returns {number}
 */
const countFilters = (obj: AuthQueryPlan): number => {
  return obj.children.reduce(
    (p, c) => p + countFilters(c),
    obj.filters ? Object.keys(obj.filters).length : 0
  );
};

/**
 * Optimizes an authorization query plan by removing children without any
 * filters.  (Effectively removes JOINs from the generated SQL that are not
 * required for authorization)
 *
 * @param {AuthQueryPlan} obj
 * @returns {AuthQueryPlan}
 */
export const optimizeQueryPlan = (obj: AuthQueryPlan): AuthQueryPlan => {
  return Object.assign(obj, {
    children: obj.children
      .filter((c) => countFilters(c) > 0)
      .map((c) => optimizeQueryPlan(c)),
  });
};

/**
 * Returns an optimized authorization query plan for the specified table and
 * authorization group.
 *
 * @param {AuthContext} auth
 * @param {TableName} table
 * @returns {*}
 */
export const createAuthorizationPlan = (
  auth: AuthContext,
  table: TableName
) => {
  return optimizeQueryPlan(buildAuthQueryPlan(auth, table));
};

/**
 * Returns true if the specified key exists in the query plan, false otherwise.
 *
 * @param {AuthQueryPlan} step
 * @param {string} key
 * @returns {boolean}
 */
const findKey = (step: AuthQueryPlan, key: string): boolean => {
  if (step.key === key) return true;
  if (step.parent !== null) return findKey(step.parent, key);
  return false;
};

/**
 * Build a query plan for the specified authorization context and table.
 * 
 * This is done by following the relationships of tables defined in
 * relationships.ts, and applying the filtering rules for the specified
 * authorization context.  The query plan translates essentially to a SQL
 * statement with JOINs which restrict access according to the filters defined
 * in auth.ts.
 * 
 * The function is called recursively for each relationship.
 *
 * @param {*} auth
 * @param {*} table
 * @param {*} [step={
    key: table,
    table,
    filters: {},
    children: [],
    parent: null,
    depth: 0,
  }]
 * @param {(number | false)} [depth=false]
 * @returns {*}
 */
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
    // Unauthenticated users cannot query anything, so we set an impossible
    // condition  (WHERE 1 = 2)
    step.filters = { where: [1, 2] };
    return step;
  }
  // If the table has an associated filter in the authorization context, add
  // that filter to the query plan.
  if (table in auth.filters) {
    step.filters = auth.filters[table];
  }

  // Recursively add filters for each table relationship.
  if (table in tableRelationships) {
    const j = tableRelationships[table];
    if (j) {
      j.filter(
        (joinConf) =>
          typeof joinConf.auth !== 'undefined' && (depth === false || depth > 0)
      ).forEach((joinConf) => {
        if (typeof joinConf.auth === 'undefined') return; // type guard
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
