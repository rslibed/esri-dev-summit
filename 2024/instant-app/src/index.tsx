// Copyright 2024 Esri
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// React
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";

// ArcGIS Core
import "@arcgis/core/assets/esri/themes/dark/main.css";
import {
  registerMessageBundleLoader,
  createJSONLoader,
  fetchMessageBundle,
} from "@arcgis/core/intl";
import PortalItem from "@arcgis/core/portal/PortalItem";
import Portal from "@arcgis/core/portal/Portal";

// Calcite Components
import "@esri/calcite-components/dist/calcite/calcite.css";
import { setAssetPath } from "@esri/calcite-components/dist/components";

// Application/ApplicationBase
import ApplicationBase from "templates-common-library-esm/baseClasses/ApplicationBase";
import applicationBaseJSON from "./config/applicationBase.json";
import applicationJSON from "./config/application.json";
import { createMapFromItem } from "templates-common-library-esm/baseClasses/support/itemUtils";

// Service Worker
import * as serviceWorker from "./serviceWorker";

// Redux
import { Provider } from "react-redux";
import { createStore, Store } from "redux";
import { rootReducer, RootState } from "./redux";
import { composeWithDevTools } from "redux-devtools-extension";

import ConfigurationSettings from "./Components/ConfigurationSettings/ConfigurationSettings";
import { ConfigState } from "./types/interfaces";
import { getMessageBundlePath, setMode } from "./utils/utils";

import { setPageTitle } from "templates-common-library-esm/baseClasses/support/domHelper";
import { defineLocale } from "templates-common-library-esm/structuralFunctionality/locale";
import { EAppTemplateType } from "templates-common-library-esm/baseClasses/CompatibilityChecker";
import { ApplicationConfig } from "templates-common-library-esm/interfaces/applicationBase";

import ErrorMessageT9n from "./t9n/ErrorMessage/resources.json";
import { IPortalItem } from "./redux/reducers/portalItem";

import { getSavedData } from "./utils/localStorage";

(async function init(): Promise<void> {
  setAssetPath(
    new URL(`${import.meta.env.BASE_URL}assets/assets`, window.location.href)
      .href
  );
  registerMessageBundleLoader(
    createJSONLoader({
      pattern: `${import.meta.env.BASE_URL}`,
      base: `${import.meta.env.BASE_URL}`,
      location: new URL(`${import.meta.env.BASE_URL}`, window.location.href),
    })
  );
  const base = await createApplicationBase().load(EAppTemplateType.Reporter);

  base.config = {
    ...base.config,
    ...getSavedData(),
  };

  const config = (
    window.location !== window.parent.location
      ? { ...base.config, ...(base.config.draft as ApplicationConfig) }
      : { ...base.config }
  ) as ConfigState;

  setMode(config.theme as "light" | "dark");
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const urlMapId = urlParams.has("webmap") ? urlParams.get("webmap") : null;
  const appProxies = base.results?.applicationItem?.value?.applicationProxies;
  const item = await getPortalItem(urlMapId, base, config);
  const map = (await createMapFromItem({ item, appProxies })) as __esri.WebMap;
  const appItemTitle = base.results?.applicationItem?.value?.title;
  config.title =
    config.title?.length > 0
      ? config.title
      : appItemTitle != null
      ? appItemTitle
      : "";
  config.splashIsOpen = config.splashOnStart;

  setPageTitle(config.title);
  defineLocale({ config, portal: item.portal });

  const initialState: RootState = {
    map,
    portalItem: item as IPortalItem,
    config,
    mobile: {
      showMobileMode: false,
    },
  };

  let store: Store;
  if (process.env.NODE_ENV === "development") {
    store = createStore(rootReducer, initialState, composeWithDevTools());
  } else {
    store = createStore(rootReducer, initialState);
  }

  const assetsPath = new URL("./assets/", window.location.href).href;

  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
        <ConfigurationSettings />
      </Provider>
    </React.StrictMode>
  );

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
})().catch(async (error: Error) => {
  const urlParams = new URLSearchParams(window.location.search);
  const locale = urlParams.get("locale");
  const portal = new Portal({ url: applicationJSON.portalUrl });
  defineLocale({ config: { locale }, portal });
  const data = (await fetchMessageBundle(
    getMessageBundlePath("ErrorMessage")
  )) as typeof ErrorMessageT9n;
  if (error?.message === "Item does not exist or is inaccessible.") {
    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
      <div className="esri-error-message">
        <p>{data?.inaccessible}</p>
      </div>
    );
  } else {
    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
      <div className="esri-error-message">
        <p>{data?.loadError}</p>
      </div>
    );
  }
});

function createApplicationBase(): ApplicationBase {
  const config = applicationJSON;
  const settings = applicationBaseJSON;
  return new ApplicationBase({
    config,
    settings,
  });
}

async function getPortalItem(
  urlMapId: string | null,
  base: ApplicationBase,
  config: ConfigState
): Promise<PortalItem> {
  if (urlMapId != null) {
    return (await new PortalItem({
      portal: base.portal,
      id: urlMapId,
    }).load()) as PortalItem;
  } else {
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
}
