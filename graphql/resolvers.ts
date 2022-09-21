import { DatasourceContext } from "./api";
import { AuthContext } from "./auth";

export default {
    Query: {
      // _version() {
      //   return 'muffin';
      // },
      addresses(_: any, args: any, context: AuthContext & DatasourceContext) {
        return context.dataSources.wasteWater.get('addresses', args, context);
      },
      organizations(_: any, args: any, context: AuthContext & DatasourceContext) {
        return context.dataSources.wasteWater.get('organizations', args, context);
      },
      datasets(_: any, args: any, context: AuthContext & DatasourceContext) {
        return context.dataSources.wasteWater.get('datasets', args, context);
      },
      polygons(_: any, args: any, context: AuthContext & DatasourceContext) {
        return context.dataSources.wasteWater.get('polygons', args, context);
      },
      instruments(_: any, args: any, context: AuthContext & DatasourceContext) {
        return context.dataSources.wasteWater.get('instruments', args, context);
      },
      setLUs(_: any, args: any, context: AuthContext & DatasourceContext) {
        return context.dataSources.wasteWater.get('setLUs', args, context);
      },
      partLUs(_: any, args: any, context: AuthContext & DatasourceContext) {
        return context.dataSources.wasteWater.get('partLUs', args, context);
      },
      contacts(_: any, args: any, context: AuthContext & DatasourceContext) {
        return context.dataSources.wasteWater.get('contacts', args, context);
      },
      methodSteps(_: any, args: any, context: AuthContext & DatasourceContext) {
        return context.dataSources.wasteWater.get('methodSteps', args, context);
      },
      methodSets(_: any, args: any, context: AuthContext & DatasourceContext) {
        return context.dataSources.wasteWater.get('methodSets', args, context);
      },
      measureSets(_: any, args: any, context: AuthContext & DatasourceContext) {
        return context.dataSources.wasteWater.get('measureSets', args, context);
      },
      languageLUs(_: any, args: any, context: AuthContext & DatasourceContext) {
        return context.dataSources.wasteWater.get('languageLUs', args, context);
      },
      translationLUs(_: any, args: any, context: AuthContext & DatasourceContext) {
        return context.dataSources.wasteWater.get('translationLUs', args, context);
      },
      samples(_: any, args: any, context: AuthContext & DatasourceContext) {
        return context.dataSources.wasteWater.get('samples', args, context);
      },
      sites(_: any, args: any, context: AuthContext & DatasourceContext) {
        return context.dataSources.wasteWater.get('sites', args, context);
      },
      measures(_: any, args: any, context: AuthContext & DatasourceContext) {
        return context.dataSources.wasteWater.get('measures', args, context);
      },
    },
  };