export type AuthNodeType = 'start' | 'end' | 'condition' | 'operation' | 'path';

export type AuthNode = {
  key: string;
  label: string;
  type: AuthNodeType;
  depth: number;
  children: AuthNode[];
};
