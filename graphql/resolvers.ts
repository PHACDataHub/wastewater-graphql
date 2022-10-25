import { apiSingleResolver, apiResolver } from './api/resolvers';

const resolvers: Resolvers = {
  Samples: {
    parentSample: apiSingleResolver('samples', ['sampID', 'parSampID']),
    methodSet: apiSingleResolver('methodSets', 'mSRID'),
    contact: apiSingleResolver('contacts', 'contID'),
    purpose: apiSingleResolver('partLUs', ['partID', 'purposeID']),
    dataset: apiSingleResolver('datasets', 'dataID'),
    measures: apiResolver('measures', ['sampleID', 'sampID']),
  },
  Measures: {
    methodSet: apiSingleResolver('methodSets', 'mSRID'),
    sample: apiSingleResolver('samples', ['sampID', 'sampleID']),
    purpose: apiSingleResolver('partLUs', ['partID', 'purposeID']),
    polygon: apiSingleResolver('polygons', 'polygonID'),
    site: apiSingleResolver('sites', 'siteID'),
    dataset: apiSingleResolver('datasets', 'dataID'),
    measureSet: apiSingleResolver('measureSets', 'measSetRepID'),
    spec: apiSingleResolver('partLUs', ['partID', 'specID']),
    fraction: apiSingleResolver('partLUs', ['partID', 'fractionID']),
    meas: apiSingleResolver('partLUs', ['partID', 'measID']),
    group: apiSingleResolver('partLUs', ['partID', 'groupID']),
    class: apiSingleResolver('partLUs', ['partID', 'classID']),
    unit: apiSingleResolver('partLUs', ['partID', 'unitID']),
    agg: apiSingleResolver('partLUs', ['partID', 'aggID']),
  },
  Addresses: {
    organizations: apiResolver('organizations', 'addID'),
  },
  Organizations: {
    address: apiSingleResolver('addresses', 'addID'),
    contacts: apiResolver('contacts', 'orgID'),
    methodSteps: apiResolver('methodSteps', 'orgID'),
  },
  Datasets: {
    funder: apiSingleResolver('organizations', ['orgID', 'funderID']),
    custody: apiSingleResolver('organizations', ['orgID', 'custodyID']),
    samples: apiResolver('samples', 'dataID'),
    measures: apiResolver('measures', 'dataID'),
    polygons: apiResolver('polygons', 'dataID'),
    instruments: apiResolver('instruments', 'dataID'),
    sites: apiResolver('sites', 'dataID'),
  },
  Polygons: {
    measures: apiResolver('measures', 'polygonID'),
    sites: apiResolver('sites', 'polygonID'),
  },
  Instruments: {
    dataset: apiSingleResolver('datasets', 'dataID'),
    methodSteps: apiResolver('methodSteps', 'instID'),
  },
  Contacts: {
    organization: apiSingleResolver('contacts', 'orgID'),
    samples: apiResolver('samples', 'contID'),
    methodSteps: apiResolver('methodSteps', 'contID'),
  },
  MethodSteps: {
    meth: apiSingleResolver('partLUs', ['partID', 'methID']),
    meas: apiSingleResolver('partLUs', ['partID', 'measID']),
    organization: apiSingleResolver('organizations', 'orgID'),
    contact: apiSingleResolver('contacts', 'contID'),
    instrument: apiSingleResolver('instruments', 'instID'),
    unit: apiSingleResolver('partLUs', ['partID', 'unitID']),
    agg: apiSingleResolver('partLUs', ['partID', 'aggID']),
    methodSets: apiResolver('methodSets', 'stepID'),
  },
  MethodSets: {
    methodStep: apiSingleResolver('methodSteps', 'StepID'),
    samples: apiResolver('samples', 'mSRID'),
    measures: apiResolver('measures', 'mSRID'),
    measureSets: apiResolver('measureSets', 'mSRID'),
  },
  MeasureSets: {
    methodSet: apiSingleResolver('methodSets', 'mSRID'),
    measures: apiResolver('measures', 'measSetRepID'),
  },
  LanguageLUs: {
    translationLUs: apiResolver('translationLUs', 'langID'),
  },
  TranslationLUs: {
    languageLU: apiSingleResolver('languageLUs', 'langID'),
    partLU: apiSingleResolver('partLUs', 'partID'),
  },
  Sites: {
    parentSite: apiSingleResolver('sites', ['siteID', 'parSiteID']),
    polygon: apiSingleResolver('polygons', 'polygonID'),
    dataset: apiSingleResolver('datasets', 'dataID'),
    measures: apiResolver('measures', 'siteID'),
  },
  Query: {
    // _version() {
    //   return 'muffin';
    // },
    addresses: apiResolver('addresses'),
    organizations: apiResolver('organizations'),
    datasets: apiResolver('datasets'),
    polygons: apiResolver('polygons'),
    instruments: apiResolver('instruments'),
    optionSets: apiResolver('optionSets'),
    setLUs: apiResolver('setLUs'),
    partLUs: apiResolver('partLUs'),
    contacts: apiResolver('contacts'),
    methodSteps: apiResolver('methodSteps'),
    methodSets: apiResolver('methodSets'),
    measureSets: apiResolver('measureSets'),
    languageLUs: apiResolver('languageLUs'),
    translationLUs: apiResolver('translationLUs'),
    samples: apiResolver('samples'),
    sites: apiResolver('sites'),
    measures: apiResolver('measures'),
  },
};

export default resolvers;
