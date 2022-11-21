import { AuthContext } from '../../types';
import { createAuthorizationPlan } from '../authorization';
import { AuthQueryPlan, TableName } from '../types';
import { AuthNode, AuthNodeType } from './types';

export const authQueryPlanToString = (obj: AuthQueryPlan, i = 0): string => {
  const pf = ' '.repeat(i);
  const f = obj.filters
    ? Object.keys(obj.filters)
        .map((k) => `[${k}] = ${JSON.stringify((obj.filters as any)[k])}`)
        .join(', ')
    : '';
  return `${pf}${obj.key} (${f}) =>\n${obj.children
    .map((c) => authQueryPlanToString(c, i + 2))
    .join('')}`;
};

const getObjects = (node: AuthNode): string[] => {
  return [`${node.key}[label="${node.label}"]`].concat(
    ...node.children.map((c) => getObjects(c))
  );
};

const getPaths = (
  node: AuthNode,
  prefix = '',
  paths: string[] = []
): string[] => {
  const key = `${prefix ? `${prefix}->` : ''}${node.key}`;
  if (prefix && node.children.length === 0 && prefix !== node.key)
    paths.push(key);
  node.children.map((c) => {
    paths.push(`${node.key}->${c.key}`);
    const path = getPaths(c, c.key, paths);
    return path;
  });

  return paths;
};

export const addNode = (
  key: string,
  label: string,
  type: AuthNodeType,
  depth: number,
  tree?: AuthNode
) => {
  const node: AuthNode = {
    label,
    key,
    type,
    depth,
    children: [],
  };
  if (tree) tree.children.push(node);
  if (tree && type === 'condition') {
    addNode(`${key}_Has_Rows`, 'Has rows', 'path', depth, node);
    addNode(`${key}_No_Rows`, 'No rows', 'path', depth, node);
  }
  return node;
};

const recurseAuth = (plan: AuthQueryPlan, parent?: AuthNode) => {
  const node = parent
    ? addNode(
        `${plan.key}_join`,
        `LEFT JOIN ${plan.table}\\nAt level: ${
          plan.depth
        }\\nRequired: ${Boolean(plan.required)}`,
        'condition',
        plan.depth,
        parent
      )
    : addNode(plan.key, plan.table, 'start', plan.depth);

  const activePaths = node.children.length > 0 ? [node.children[0]] : [node];
  if (parent) {
    if (plan.required) {
      addNode('denied', 'Access Denied', 'end', plan.depth, node.children[1]);
    } else {
      //activePaths.push(node.children[1]);
      addNode('granted', 'Access Granted', 'end', plan.depth, node.children[1]);
    }
  }

  if (plan.filters && (plan.filters.where || plan.filters.whereNot)) {
    const cond_text = Object.keys(plan.filters || {})
      .map((c) => {
        if (typeof plan.filters !== 'undefined') {
          const filter = plan.filters[c as 'where' | 'whereNot'];
          return (
            (filter &&
              `${c.toUpperCase()}\\n${plan.table}.${
                filter[0]
              } = ${JSON.stringify(filter[1]).replace(/[\""]/g, '\\"')}`) ||
            ''
          );
        }
        return '';
      })
      .join('\\nAND\\n');

    const filterPaths = activePaths.map((a) =>
      addNode(`${plan.key}_where`, cond_text, 'condition', plan.depth, a)
    );
    filterPaths.forEach((fp) =>
      addNode('denied', 'Access Denied', 'end', plan.depth, fp.children[1])
    );
    activePaths.splice(
      0,
      activePaths.length,
      ...filterPaths.map((fp) => fp.children[0])
    );
  }

  activePaths.forEach((a) => plan.children.forEach((c) => recurseAuth(c, a)));
  if (plan.children.length === 0) {
    activePaths.forEach((a) =>
      addNode('granted', 'Access Granted', 'end', plan.depth, a)
    );
  }

  return node;
};

export const generateAuthDiagram = (plan: AuthQueryPlan) => {
  const node = recurseAuth(plan);
  const objects = new Set(getObjects(node));
  const paths = getPaths(node);

  return `
digraph G {
  ${Array.from(objects).join('\n  ')}

  ${paths.join('\n  ')}
}
  `;
};

export const saveAuthDiagram = (
  auth: AuthContext,
  target: TableName,
  filename: string
) => {
  try {
    const diagram = generateAuthDiagram(createAuthorizationPlan(auth, target));
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fs = require('fs');
    const err = fs.writeFileSync(filename, diagram);
    if (err) {
      console.error('Unable to save diagram.\n');
      console.error(err);
      process.exit(1);
    }
  } catch (err: any) {
    console.error('Unable to generate diagram.\n');
    console.error(err);
    process.exit(1);
  }
};
