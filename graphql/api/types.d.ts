
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
  [table in TableName]?: [string, string][]
}

type ApiResolver = (
  name: TableName,
  rule?:
    | ((parent: any, args: any) => FilteredFields)
    | string
    | [string, string], // column in `name`, column in `parent`
  columnMaps?: readonly [string, string][],
  single?: boolean
) => ResolverFunc;
