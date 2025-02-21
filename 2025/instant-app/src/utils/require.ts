import Handles from "@arcgis/core/core/Handles";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
import * as esriIntl from "@arcgis/core/intl";
import esriRequest from "@arcgis/core/request";
import WebMap from "@arcgis/core/WebMap";
import PortalItemResource from "@arcgis/core/portal/PortalItemResource";

//  * This is a small adaptor for apps using esri-loader's `loadModules` function in 4.x
//  * essentially we trick loadModules into thinking we have a dojo loader declared
//  * then we just provide modules from @arcgis/core
//  */

// @ts-ignore
window.require = function require(modulePaths: string[], cb) {
  const moduleMap = {
    "esri/core/Handles": Handles,
    "esri/core/reactiveUtils": reactiveUtils,
    "esri/intl": esriIntl,
    "esri/request": esriRequest,
    "esri/WebMap": WebMap,
    "esri/portal/PortalItemResource": PortalItemResource
  };
  const modules = modulePaths.map((name) => {
    // @ts-ignore
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
