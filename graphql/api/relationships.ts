import { TableRelationships } from './types';

/**
 * List of SQL tables
 *
 * @type {readonly [
 *  "addresses",
 *  "allSites"
 *  "allSitesAdj"
 *  "organizations",
 *  "datasets",
 *  "Infobase",
 *  "InfobaseTrend",
 *  "polygons",
 *  "instruments",
 *  "sets",
 *  "parts",
 *  "contacts",
 *  "measureSets",
 *  "methodSteps",
 *  "methodSets",
 *  "languages",
 *  "translations",
 *  "sites",
 *  "samples",
 *  "measures",
 *  "StandardCurve",
 *  "countries",
 *  "zones",
 *  "TownLevelDataTrend",
 *  "provinceleveldata",
 *  "canadaleveldata",
 * 
 * ]}
 */
export const tables = [
  'addresses',
  'allSites',
  'allSitesAdj',
  'organizations',
  'datasets',
  'Infobase',
  'InfobaseTrend',
  'polygons',
  'instruments',
  'sets',
  'parts',
  'contacts',
  'measureSets',
  'methodSteps',
  'methodSets',
  'languages',
  'translations',
  'sites',
  'samples',
  'measures',
  'qualityReports',
  'StandardCurve',
  'countries',
  'zones',
  "TownLevelDataTrend",
  "provinceleveldata",
  "canadaleveldata",
] as const;

/**
 * Defines the list of foreign key relationships in the underlying SQL database.
 *
 * Relationships that enforce authorization rules must declare an `auth` object
 * with the applicable `depth`.  Depth determines how many relationships to
 * traverse during lookup and they are applied at the beginning of a query only.
 * In other words if the query begins at table X, depths declared on related
 * tables are ignored.

 * TABLE X
 *  -> TABLE Y (depth 2)
 *    -> TABLE Z (depth 3)
 *      -> TABLE A ... 
 *
 * In the example above, queries at table `X` will stop at table `Z`, because
 * the declared depth of the first relationship is `2`.
 *
 *
 * @type {TableRelationships}
 */
export const tableRelationships: TableRelationships = {
  samples: [
    {
      table: 'sites',
      foreignKeys: 'siteID',
      auth: { depth: 1, required: true },
    },
    {
      table: 'datasets',
      foreignKeys: 'datasetID',
      auth: { depth: 1, required: true },
    },
    { table: 'methodSets', foreignKeys: 'mSRID' },
    { table: 'contacts', foreignKeys: 'contID' },
    { table: 'measures', foreignKeys: ['sampleID', 'sampID'] },
    { table: 'samples', foreignKeys: ['sampID', 'parSampID'] },
    { table: 'parts', foreignKeys: ['partID', 'purposeID'] },
  ],
  measures: [
    {
      table: 'sites',
      foreignKeys: 'siteID',
      auth: { depth: 1, required: true },
    },
    {
      table: 'datasets',
      foreignKeys: 'datasetID',
      auth: { depth: 1, required: true },
    },
    { table: 'methodSets', foreignKeys: 'mSRID' },
    { table: 'samples', foreignKeys: ['sampID', 'sampleID'] },
    { table: 'polygons', foreignKeys: 'polygonID' },
    { table: 'measureSets', foreignKeys: 'measSetRepID' },
    {
      table: 'parts',
      properties: [
        { property: 'purpose', foreignKeys: ['partID', 'purposeID'] },
        { property: 'spec', foreignKeys: ['partID', 'specID'] },
        { property: 'fraction', foreignKeys: ['partID', 'fractionID'] },
        { property: 'meas', foreignKeys: ['partID', 'measID'] },
        { property: 'group', foreignKeys: ['partID', 'groupID'] },
        { property: 'class', foreignKeys: ['partID', 'classID'] },
        { property: 'unit', foreignKeys: ['partID', 'unitID'] },
        { property: 'agg', foreignKeys: ['partID', 'aggID'] },
      ],
    },
  ],
  qualityReports: [
    {
      table: 'measures',
      foreignKeys: 'measureRepID',
      auth: { depth: 1, required: true },
    },
    { table: 'samples', foreignKeys: 'sampleID' },
    // { table: 'contacts', foreignKeys: 'contactID' },
  ],
  measureSets: [
    { table: 'methodSets', foreignKeys: 'mSRID' },
    {
      table: 'measures',
      foreignKeys: 'measSetRepID',
      auth: { depth: 2, required: true },
    },
  ],
  sites: [
    { table: 'sites', foreignKeys: ['siteID', 'parSiteID'] },
    // { table: 'polygons', foreignKeys: 'polygonID' },
    // { table: 'datasets', foreignKeys: 'datasetID' },
    { table: 'measures', foreignKeys: 'siteID' },
    {
      table: 'samples',
      foreignKeys: 'siteID',
      auth: { depth: 2, required: true },
    },
  ],
  addresses: [
    { table: 'organizations', foreignKeys: 'addID' },
    { table: 'sites', foreignKeys: 'addID', auth: { depth: 3 } },
  ],
  organizations: [
    { table: 'addresses', foreignKeys: 'addID', auth: { depth: 4 } },
    { table: 'contacts', foreignKeys: 'orgID' },
    { table: 'methodSteps', foreignKeys: 'orgID' },
  ],
  datasets: [
    {
      table: 'organizations',
      properties: [
        { property: 'funder', foreignKeys: ['orgID', 'funderID'] },
        { property: 'custody', foreignKeys: ['orgID', 'custodyID'] },
      ],
    },
    {
      table: 'samples',
      foreignKeys: 'datasetID',
      auth: { depth: 2, required: true },
    },
    { table: 'measures', foreignKeys: 'datasetID' },
    { table: 'polygons', foreignKeys: 'datasetID' },
    { table: 'instruments', foreignKeys: 'datasetID' },
    { table: 'sites', foreignKeys: 'datasetID' },
  ],
  polygons: [
    { table: 'measures', foreignKeys: 'polygonID' },
    {
      table: 'sites',
      foreignKeys: 'polygonID',
      auth: { depth: 3, required: true },
    },
  ],
  instruments: [
    { table: 'datasets', foreignKeys: 'datasetID', auth: { depth: 3 } },
    { table: 'methodSteps', foreignKeys: 'instID' },
  ],

  contacts: [
    { table: 'contacts', foreignKeys: 'orgID' },
    { table: 'samples', foreignKeys: 'contID', auth: { depth: 2 } },
    { table: 'methodSteps', foreignKeys: 'contID' },
  ],
  methodSteps: [
    {
      table: 'parts',
      properties: [
        { property: 'meth', foreignKeys: ['partID', 'methID'] },
        { property: 'meas', foreignKeys: ['partID', 'measID'] },
        { property: 'unit', foreignKeys: ['partID', 'unitID'] },
        { property: 'agg', foreignKeys: ['partID', 'aggID'] },
      ],
    },
    {
      table: 'organizations',
      foreignKeys: 'orgID',
      auth: { depth: 5, required: true },
    },
    { table: 'contacts', foreignKeys: 'contID' },
    { table: 'instruments', foreignKeys: 'instID' },
    { table: 'methodSets', foreignKeys: 'stepID' },
  ],
  methodSets: [
    { table: 'methodSteps', foreignKeys: 'StepID' },
    { table: 'samples', foreignKeys: 'mSRID', auth: { depth: 2 } },
    { table: 'measures', foreignKeys: 'mSRID' },
    { table: 'measureSets', foreignKeys: 'mSRID' },
  ],
  languages: [{ table: 'translations', foreignKeys: 'langID' }],
  translations: [
    { table: 'languages', foreignKeys: 'langID' },
    { table: 'parts', foreignKeys: 'partID' },
  ],
  allSites: [
    {
      table: 'datasets',
      foreignKeys: 'datasetID',
      auth: { depth: 1, required: true },
    },
    {
      table: 'sites',
      foreignKeys: 'healthReg',
      auth: { depth: 1, required: true },
    },
    { table: 'samples', foreignKeys: ['sampID', 'sampleID'] },
    {
      table: 'parts',
      properties: [
        { property: 'fraction', foreignKeys: ['partID', 'fractionID'] },
        { property: 'meas', foreignKeys: ['partID', 'measID'] },
      ],
    },
  ],
  allSitesAdj: [
    {
      table: 'datasets',
      foreignKeys: 'datasetID',
      auth: { depth: 1, required: true },
    },
    {
      table: 'sites',
      foreignKeys: 'healthReg',
      auth: { depth: 1, required: true },
    },
    { table: 'samples', foreignKeys: ['sampID', 'sampleID'] },
    {
      table: 'parts',
      properties: [
        { property: 'fraction', foreignKeys: ['partID', 'fractionID'] },
        { property: 'meas', foreignKeys: ['partID', 'measID'] },
      ],
    },
  ],
  Infobase: [
    {
      table: 'parts',
      properties: [
        { property: 'fraction', foreignKeys: ['partID', 'fractionid'] },
        { property: 'meas', foreignKeys: ['partID', 'measureid'] },
      ],
    },
  ],
  InfobaseTrend: [
    {
      table: 'parts',
      properties: [
        { property: 'fraction', foreignKeys: ['partID', 'fractionid'] },
        { property: 'meas', foreignKeys: ['partID', 'measureid'] },
      ],
    },
  ],
  StandardCurve: [
    {
      table: 'samples',
      foreignKeys: 'sampleID',
      auth: { depth: 2, required: true },
    },
  ],
};
