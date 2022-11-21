import { WasteWaterAPI } from '.';
import { ResolverFunc, AuthFilter } from '../types';
import { tables } from './relationships';

export type TableName = typeof tables[number];

export interface StringFilter {
  is?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
}
export interface NumberFilter {
  is?: number;
  greaterThan?: number;
  greaterOrEqualThan?: number;
  lesserThan?: number;
  lesserOrEqualThan?: number;
  between?: {
    min: number;
    max: number;
  }
}
export interface DateFilter {
  is?: string;
  greaterThan?: string;
  greaterOrEqualThan?: string;
  lesserThan?: string;
  lesserOrEqualThan?: string;
  between?: {
    min: string;
    max: string;
  }
}

export type StandardFilter = StringFilter | NumberFilter | DateFilter;

export interface FilteredFields {
  [field: string]: StandardFilter;
}

export type DatasourceContext = {
  dataSources: {
    wasteWater: WasteWaterAPI;
  };
};

export type TableColumnMaps = {
  [table in TableName]?: [string, string][];
};

export type ApiResolver = (
  name: TableName,
  rule?:
    | ((parent: any, args: any) => FilteredFields)
    | string
    | [string, string], // column in `name`, column in `parent`
  columnMaps?: readonly [string, string][],
  single?: boolean
) => ResolverFunc;

export type TableFk = string | [string, string];
export type TableRelantionships = Partial<
  Record<TableName, RelantionshipConfig[]>
>;

export type BaseRelantionshipConfig = {
  table: TableName;
  auth?: {
    depth: number; // depth 0 no limit
    required?: boolean;
  };
};

export type FKRelantionshipConfig = BaseRelantionshipConfig & {
  foreignKeys: TableFk;
};

export type PropRelantionshipConfig = BaseRelantionshipConfig & {
  properties: PropertyRelantionShipConfig[];
};

export type RelantionshipConfig =
  | FKRelantionshipConfig
  | PropRelantionshipConfig;

export type PropertyRelantionShipConfig = Omit<
  FKRelantionshipConfig,
  'table'
> & {
  property: string;
};

export type AuthQueryPlan = {
  key: string;
  table: TableName;
  filters?: AuthFilter;
  children: AuthQueryPlanChild[];
  parent: AuthQueryPlan | null;
  required?: boolean;
  depth: number;
};

export type AuthQueryPlanChild = AuthQueryPlan & { fk: TableFk };

export type GetResolverFunc = (
  table: TableName,
  property?: string
) => ResolverFunc;

export type WithResolverCallBack = (getResolvers: {
  single: GetResolverFunc;
  list: GetResolverFunc;
}) => {
  [key: string]: ResolverFunc;
};
