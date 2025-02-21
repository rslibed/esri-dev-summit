import App from "./App";
import ApplicationBaseProvider from "./Context/Providers/ApplicationBaseProvider";
import ConfigurationSettingsProvider from "./Context/Providers/ConfigurationSettingsProvider";
import "./index.scss";
import "./utils/componentImports";
import { createJSONLoader, registerMessageBundleLoader } from "@arcgis/core/intl";
import PortalItem from "@arcgis/core/portal/PortalItem";
import "@esri/calcite-components";
import { setAssetPath } from "@esri/calcite-components";
import { setAssetPath as setAssetPathForInstantAppsComponents } from "@arcgis/instant-apps-components/dist/components";

import React from "react";
import { createRoot } from "react-dom/client";
import applicationJSON from "src/config/application.json";
import applicationBaseJSON from "src/config/applicationBase.json";
import applicationBase from "src/config/applicationBase.json";
// Resolves esri-loader/@arcgis/core JSAPI conflict
import "src/utils/require";
import ApplicationBase from "templates-common-library-esm/baseClasses/ApplicationBase";
import { EAppTemplateType } from "templates-common-library-esm/baseClasses/CompatibilityChecker";
import { setPageTitle } from "templates-common-library-esm/baseClasses/support/domHelper";
import { createMapFromItem } from "templates-common-library-esm/baseClasses/support/itemUtils";

(async function () {
  initAssets();

  const base = (await createApplicationBase().load(EAppTemplateType.Basic)) as ApplicationBase;

  registerMessageBundleLoader(
    createJSONLoader({
      pattern: `${import.meta.env.BASE_URL}`,
      base: `${import.meta.env.BASE_URL}`,
      location: new URL(`${import.meta.env.BASE_URL}`, window.location.href)
    })
  );

  const config =
    window.location !== window.parent!.location
      ? { ...base.config, ...base.config.draft }
      : { ...base.config };

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const mapId = urlParams.get("webmap");
  let item: __esri.PortalItem;

  if (mapId) {
    const portalItem = new PortalItem({
      portal: base.portal,
      id: mapId
    });
    const loadedPortalItem = await portalItem.load();
    item = loadedPortalItem;
  } else {
    const { webMapItems } = base.results;
    item = webMapItems?.[0]?.value as any;
  }

  const appProxies = base.results?.applicationItem?.value?.applicationProxies;

  try {
    const map = await createMapFromItem({ item, appProxies });
    if (map) map.load();
    const appItemTitle = base?.results?.applicationItem?.value?.title;

    const title = config?.title
      ? config.title
      : appItemTitle
        ? appItemTitle
        : item?.title
          ? item.title
          : "Instant Apps: React Starter";

    setPageTitle(title);

    config.title = title;
    config.webmap = getMapId(config.webmap);

    const root = createRoot(document.getElementById("root") as HTMLElement);

    root.render(
      <React.StrictMode>
        <ApplicationBaseProvider base={base}>
          <ConfigurationSettingsProvider config={config}>
            <App />
          </ConfigurationSettingsProvider>
        </ApplicationBaseProvider>
      </React.StrictMode>
    );
  } catch {}
})();

function createApplicationBase(): ApplicationBase {
  const config = applicationJSON;
  const settings = applicationBaseJSON;
  return new ApplicationBase({
    config,
    settings
  });
}

function initAssets() {
  const assetsPath = new URL(`${import.meta.env.BASE_URL}assets`, window.location.href).href;
  setAssetPath(assetsPath);
  setAssetPathForInstantAppsComponents(assetsPath);
}

function getMapId(id: string) {
  return id === "default" ? applicationBase.webMap.default : id;
}
