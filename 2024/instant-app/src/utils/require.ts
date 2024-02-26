/**
 * This is a small adaptor for apps using esri-loader's `loadModules` function in 4.x
 * essentially we trick loadModules into thinking we have a dojo loader declared
 * then we just provide modules from @arcgis/core
 */
import * as arcade from "@arcgis/core/arcade";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
import Features from "@arcgis/core/widgets/Features";
import Editor from "@arcgis/core/widgets/Editor";
import * as intl from "@arcgis/core/intl";
import Point from "@arcgis/core/geometry/Point";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import esriRequest from "@arcgis/core/request";
import Handles from "@arcgis/core/core/Handles";
import Widget from "@arcgis/core/widgets/Widget";
import Legend from "@arcgis/core/widgets/Legend";
import LegendViewModel from "@arcgis/core/widgets/Legend/LegendViewModel";
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter";
import FeatureEffect from "@arcgis/core/layers/support/FeatureEffect";

// @ts-ignore
window.require = function require(modulePaths: string[], cb) {
  const moduleMap = {
    "esri/arcade": arcade,
    "esri/core/reactiveUtils": reactiveUtils,
    "esri/widgets/Features": Features,
    "esri/widgets/Editor": Editor,
    "esri/intl": intl,
    "esri/geometry/Point": Point,
    "esri/geometry/SpatialReference": SpatialReference,
    "esri/request": esriRequest,
    "esri/core/Handles": Handles,
    "esri/widgets/Widget": Widget,
    "esri/widgets/Legend": Legend,
    "esri/widgets/Legend/LegendViewModel": LegendViewModel,
    "esri/layers/support/FeatureFilter": FeatureFilter,
    "esri/layers/support/FeatureEffect": FeatureEffect
  };
  const modules = modulePaths.map((name) => {
    const module = moduleMap[name];
    if (!module) {
      console.error(`${name} not defined. Please add to utils/require.ts`);
    }
    return module;
  });
  cb.apply(null, modules);
};
// this has to be defined to fool esri-loader
// @ts-ignore
window.require.on = function () {
  return { remove: () => {} };
};
