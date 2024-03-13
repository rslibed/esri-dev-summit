import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { createStore, Store } from "redux";
import { rootReducer, RootState } from "./redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { IPortalItem } from "./redux/reducers/portalItem";

import {
  registerMessageBundleLoader,
  createJSONLoader,
} from "@arcgis/core/intl";
import PortalItem from "@arcgis/core/portal/PortalItem";

import { setAssetPath } from "@esri/calcite-components/dist/components";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-switch";
import "@esri/calcite-components/dist/components/calcite-tooltip";
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-modal";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";

import "@esri/instant-apps-components/dist/components/instant-apps-header";
import "@esri/instant-apps-components/dist/components/instant-apps-interactive-legend";
import "@esri/instant-apps-components/dist/components/instant-apps-keyboard-shortcuts";
import "@esri/instant-apps-components/dist/components/instant-apps-measurement";
import "@esri/instant-apps-components/dist/components/instant-apps-social-share";

import ApplicationBase from "templates-common-library-esm/baseClasses/ApplicationBase";
import { setPageTitle } from "templates-common-library-esm/baseClasses/support/domHelper";
import { defineLocale } from "templates-common-library-esm/structuralFunctionality/locale";
import { EAppTemplateType } from "templates-common-library-esm/baseClasses/CompatibilityChecker";
import { createMapFromItem } from "templates-common-library-esm/baseClasses/support/itemUtils";

import applicationBaseJSON from "./config/applicationBase.json";
import applicationJSON from "./config/application.json";

import App from "./App";

import { ConfigState } from "./types/interfaces";

import { getSavedData } from "./utils/localStorage";
import { setMode } from "./utils/utils";

import "./index.scss";

import "./utils/require";

const { BASE_URL } = import.meta.env;

(async function init(): Promise<void> {
  // Set up assets path (required due to multiple StencilJS libraries)
  const path = getAssetsPath();
  const { href } = window.location;
  const url = new URL(path, href).href;
  setAssetPath(url);

  // registerMessageBundleLoader: Load apps in different languages
  registerMessageBundleLoader(
    createJSONLoader({
      pattern: BASE_URL,
      base: BASE_URL,
      location: new URL(BASE_URL, href),
    })
  );

  // ApplicationBase: A class designed to handle common tasks of ArcGIS Instant Apps.
  // Portal information
  // User information
  // Item data (webscenes, webmaps, group information, group items)
  // Configured application information
  // URL parameters
  // The ApplicationBase will handle fetching this information, store it, and perform setup when necessary.
  const base = await createApplicationBase().load(EAppTemplateType.Reporter);
  // Saved data from local storage
  base.config = {
    ...base.config,
    ...getSavedData(),
  };

  const config = { ...base.config } as ConfigState;

  // Create map for initial state
  const appProxies = base.results?.applicationItem?.value?.applicationProxies;
  const item = await getPortalItem(base, config);
  const map = (await createMapFromItem({ item, appProxies })) as __esri.WebMap;

  // App title
  setPageTitle(config.title);

  defineLocale({ config, portal: item.portal });

  // App theme
  setMode(config.theme);

  const initialState: RootState = {
    map,
    portalItem: item as IPortalItem,
    config,
  };

  const store = createReduxStore(initialState);

  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
})();

function createReduxStore(initialState: RootState) {
  let store: Store;
  if (process.env.NODE_ENV === "development") {
    store = createStore(rootReducer, initialState, composeWithDevTools());
  } else {
    store = createStore(rootReducer, initialState);
  }
  return store;
}

function createApplicationBase(): ApplicationBase {
  const config = applicationJSON;
  const settings = applicationBaseJSON;
  return new ApplicationBase({
    config,
    settings,
  });
}

async function getPortalItem(
  base: ApplicationBase,
  config: ConfigState
): Promise<PortalItem> {
  const { webMapItems } = base.results;
  if (webMapItems != null) {
    return webMapItems[0]?.value;
  } else {
    return (await new PortalItem({
      portal: base.portal,
      id: config.webmap,
    }).load()) as PortalItem;
  }
}

function getAssetsPath() {
  return `${BASE_URL}assets/assets`;
}
