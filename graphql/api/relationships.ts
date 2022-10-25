/*
Defines the list of foreign key relationships in the underlying SQL database.

Relationships that enforce authorization rules must declare an `auth` object
with the applicable `depth`.  Depth determines how many relationships to
traverse during lookup and they are applied at the beginning of a query only. In
other words if the query begins at table X, depths declared on related tables
are ignored.

TABLE X
  -> TABLE Y (depth 2)
    -> TABLE Z (depth 3)
      -> TABLE A ... 

In the example above, queries at table `X` will stop at table `Z`, because the 
declared depth of the first relationship is `2`.
*/
export const tableRelantionships: TableRelantionships = {
  samples: [
    {
      table: 'sites',
      foreignKeys: 'siteID',
      auth: { depth: 1, required: true },
    },
    {
      table: 'datasets',
      foreignKeys: 'dataID',
      auth: { depth: 1, required: true },
    },
    { table: 'methodSets', foreignKeys: 'mSRID' },
    { table: 'contacts', foreignKeys: 'contID' },
    { table: 'measures', foreignKeys: ['sampleID', 'sampID'] },
    { table: 'samples', foreignKeys: ['sampID', 'parSampID'] },
    { table: 'partLUs', foreignKeys: ['partID', 'purposeID'] },
  ],
  measures: [
    {
      table: 'sites',
      foreignKeys: 'siteID',
      auth: { depth: 1, required: true },
    },
    {
      table: 'datasets',
      foreignKeys: 'dataID',
      auth: { depth: 1, required: true },
    },
    { table: 'methodSets', foreignKeys: 'mSRID' },
    { table: 'samples', foreignKeys: ['sampID', 'sampleID'] },
    { table: 'polygons', foreignKeys: 'polygonID' },
    { table: 'measureSets', foreignKeys: 'measSetRepID' },
    {
      table: 'partLUs',
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
    { table: 'polygons', foreignKeys: 'polygonID' },
    { table: 'datasets', foreignKeys: 'dataID' },
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
      foreignKeys: 'dataID',
      auth: { depth: 2, required: true },
    },
    { table: 'measures', foreignKeys: 'dataID' },
    { table: 'polygons', foreignKeys: 'dataID' },
    { table: 'instruments', foreignKeys: 'dataID' },
    { table: 'sites', foreignKeys: 'dataID' },
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
    { table: 'datasets', foreignKeys: 'dataID', auth: { depth: 3 } },
    { table: 'methodSteps', foreignKeys: 'instID' },
  ],

  contacts: [
    { table: 'contacts', foreignKeys: 'orgID' },
    { table: 'samples', foreignKeys: 'contID', auth: { depth: 2 } },
    { table: 'methodSteps', foreignKeys: 'contID' },
  ],
  methodSteps: [
    {
      table: 'partLUs',
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
  languageLUs: [{ table: 'translationLUs', foreignKeys: 'langID' }],
  translationLUs: [
    { table: 'languageLUs', foreignKeys: 'langID' },
    { table: 'partLUs', foreignKeys: 'partID' },
  ],
};
