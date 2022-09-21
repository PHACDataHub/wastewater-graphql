type TableName =
  | 'addresses'
  | 'organizations'
  | 'datasets'
  | 'polygons'
  | 'instruments'
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
