import { apiResolver, withParentResolver } from './api/resolvers';
import { Resolvers } from './types';

/**
 * GraphQL Resolvers.
 *
 * @type {Resolvers}
 */
const resolvers: Resolvers = {
  Samples: withParentResolver('samples')(({ single, list }) => ({
    // parentSample: single('methodSets'),
    // site: single('sites'),
    // methodSet: single('methodSets'),
    // contact: single('contacts'),
    // purpose: single('parts'),
    // dataset: single('datasets'),
    // measures: list('measures'),
  })),
  Measures: withParentResolver('measures')(({ single }) => ({
    // methodSet: single('methodSets'),
    // sample: single('samples'),
    // purpose: single('parts', 'purpose'),
    // polygon: single('polygons'),
    // site: single('sites'),
    // dataset: single('datasets'),
    // measureSet: single('measureSets'),
    // spec: single('parts', 'spec'),
    // fraction: single('parts', 'fraction'),
    // meas: single('parts', 'meas'),
    // group: single('parts', 'group'),
    // class: single('parts', 'class'),
    // unit: single('parts', 'unit'),
    // agg: single('parts', 'agg'),
  })),
  // Addresses: withParentResolver('addresses')(({ list }) => ({
  //   organizations: list('organizations'),
  //   sites: list('sites'),
  // })),
  // Organizations: withParentResolver('organizations')(({ single, list }) => ({
  //   address: single('addresses'),
  //   contacts: list('contacts'),
  //   methodSteps: list('methodSteps'),
  // })),
  Datasets: withParentResolver('datasets')(({ single, list }) => ({
    // funder: single('organizations', 'funder'),
    // custody: single('organizations', 'custody'),
    // samples: list('samples'),
    // measures: list('measures'),
    // polygons: list('polygons'),
    // instruments: list('instruments'),
    // sites: list('sites'),
  })),
  // Polygons: withParentResolver('polygons')(({ list }) => ({
  //   measures: list('measures'),
  //   sites: list('sites'),
  // })),
  // Instruments: withParentResolver('instruments')(({ single, list }) => ({
  //   dataset: single('datasets'),
  //   methodSteps: list('methodSteps'),
  // })),
  // Contacts: withParentResolver('contacts')(({ single, list }) => ({
  //   organization: single('contacts'),
  //   samples: list('samples'),
  //   methodSteps: list('methodSteps'),
  // })),
  // MethodSteps: withParentResolver('methodSteps')(({ single, list }) => ({
  //   meth: single('parts', 'meth'),
  //   meas: single('parts', 'meas'),
  //   organization: single('organizations'),
  //   contact: single('contacts'),
  //   instrument: single('instruments'),
  //   unit: single('parts', 'unit'),
  //   agg: single('parts', 'agg'),
  //   methodSets: list('methodSets'),
  // })),
  // MethodSets: withParentResolver('methodSets')(({ single, list }) => ({
  //   methodStep: single('methodSteps'),
  //   samples: list('samples'),
  //   measures: list('measures'),
  //   measureSets: list('measureSets'),
  // })),
  // MeasureSets: withParentResolver('measureSets')(({ single, list }) => ({
  //   methodSet: single('methodSets'),
  //   measures: list('measures'),
  // })),
  // LanguageLUs: withParentResolver('languageLUs')(({ list }) => ({
  //   translationLUs: list('translationLUs'),
  // })),
  // TranslationLUs: withParentResolver('translationLUs')(({ single }) => ({
  //   languageLU: single('languageLUs'),
  //   partLU: single('parts'),
  // })),
  Sites: withParentResolver('sites')(({ single, list }) => ({
    // parentSite: single('sites'),
    // polygon: single('polygons'),
    // dataset: single('datasets'),
    // measures: list('measures'),
    // samples: list('samples'),
  })),
  allSites: withParentResolver('allSites')(({ single }) => ({
    // dataset: single('datasets'),
    // sample: single('samples', 'sampID'),
    // fraction: single('parts', 'fraction'),
    // meas: single('parts', 'meas'),
  })),
  allSitesAdj: withParentResolver('allSitesAdj')(({ single }) => ({
    // dataset: single('datasets'),
    // sample: single('samples'),
    // fraction: single('parts', 'fraction'),
    // meas: single('parts', 'meas'),
  })),
  Infobase: withParentResolver('Infobase')(({ single }) => ({
    // fraction: single('parts', 'fraction'),
    // meas: single('parts', 'meas'),
  })),
  InfobaseTrend: withParentResolver('InfobaseTrend')(({ single }) => ({
    // fraction: single('parts', 'fraction'),
    // meas: single('parts', 'meas'),
  })),
  StandardCurve: withParentResolver('StandardCurve')(({ single }) => ({})),
  Countries: withParentResolver('countries')(({ single }) => ({})),
  Zones: withParentResolver('zones')(({ single }) => ({})),
  WastewaterAtEpiYearWeek: withParentResolver('WastewaterAtEpiYearWeek')(({ single }) => ({})),

  Query: {
    // addresses: apiResolver('addresses'),
    // organizations: apiResolver('organizations'),
    datasets: apiResolver('datasets'),
    // polygons: apiResolver('polygons'),
    // instruments: apiResolver('instruments'),
    sets: apiResolver('sets'),
    parts: apiResolver('parts'),
    // contacts: apiResolver('contacts'),
    // methodSteps: apiResolver('methodSteps'),
    // methodSets: apiResolver('methodSets'),
    // measureSets: apiResolver('measureSets'),
    languages: apiResolver('languages'),
    translations: apiResolver('translations'),
    samples: apiResolver('samples'),
    sites: apiResolver('sites'),
    measures: apiResolver('measures'),
    qualityReports: apiResolver('qualityReports'),
    allSites: apiResolver('allSites'),
    allSitesAdj: apiResolver('allSitesAdj'),
    Infobase: apiResolver('Infobase'),
    InfobaseTrend: apiResolver('InfobaseTrend'),
    StandardCurve: apiResolver('StandardCurve'),
    countries: apiResolver('countries'),
    zones: apiResolver('zones'),
    WastewaterAtEpiYearWeek: apiResolver('WastewaterAtEpiYearWeek'),
  },
};

export default resolvers;
