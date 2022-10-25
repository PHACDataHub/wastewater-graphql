type TableName =
  | 'addresses'
  | 'organizations'
  | 'datasets'
  | 'polygons'
  | 'instruments'
  | 'optionSets'
  | 'setLUs'
  | 'partLUs'
  | 'contacts'
  | 'measureSets'
  | 'methodSteps'
  | 'methodSets'
  | 'languageLUs'
  | 'translationLUs'
  | 'sites'
  | 'samples'
  | 'measures';
interface StringFilter {
  is?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
}
interface NumberFilter {
  is?: number;
  greaterThan?: number;
  greaterOrEqualThan?: number;
  lesserThan?: number;
  lesserOrEqualThan?: number;
}
type StandardFilter = StringFilter | NumberFilter;

interface FilteredFields {
  [field: string]: StandardFilter;
}

type DatasourceContext = {
  dataSources: {
    wasteWater: WasteWaterAPI;
  };
};

type TableColumnMaps = {
  [table in TableName]?: [string, string][];
};

type ApiResolver = (
  name: TableName,
  rule?:
    | ((parent: any, args: any) => FilteredFields)
    | string
    | [string, string], // column in `name`, column in `parent`
  columnMaps?: readonly [string, string][],
  single?: boolean
) => ResolverFunc;

type TableFk = string | [string, string];
type TableRelantionships = Partial<Record<TableName, RelantionshipConfig[]>>;

type BaseRelantionshipConfig = {
  table: TableName;
  auth?: {
    depth: number; // depth 0 no limit
    required?: boolean;
  };
};

type FKRelantionshipConfig = BaseRelantionshipConfig & {
  foreignKeys: TableFk;
};

type PropRelantionshipConfig = BaseRelantionshipConfig & {
  properties: PropertyRelantionShipConfig[];
};

type RelantionshipConfig = FKRelantionshipConfig | PropRelantionshipConfig;

type PropertyRelantionShipConfig = Omit<FKRelantionshipConfig, 'table'> & {
  property: string;
};

type AuthQueryPlan = {
  key: string;
  table: TableName;
  filters?: AuthFilter;
  children: AuthQueryPlanChild[];
  parent: AuthQueryPlan | null;
  required?: boolean;
};

type AuthQueryPlanChild = AuthQueryPlan & { fk: TableFk };

type GetResolverFunc = (table: TableName, property?: string) => ResolverFunc;

type WithResolverCallBack = (getResolvers: {
  single: GetResolverFunc;
  list: GetResolverFunc;
}) => {
  [key: string]: ResolverFunc;
};
