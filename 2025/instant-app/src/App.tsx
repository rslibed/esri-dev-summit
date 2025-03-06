import Header from "./Components/Header";
import Splash from "./Components/Splash";
import MapComponents from "./Components/MapComponents";

import {
  useApplicationBase,
  useConfigurationSettings,
} from "./Context/Contexts";
import { joinAppProxies } from "templates-common-library-esm/functionality/proxy";
import { AppProxyDefinition } from "templates-common-library-esm/interfaces/applicationBase";

import esriConfig from "@arcgis/core/config";
import { useState } from "react";

export default function App() {
  const { theme } = useConfigurationSettings();
  const { base } = useApplicationBase();

  const { webmap } = useConfigurationSettings();

  const [view, setView] = useState(null);
  const [tool, setTool] = useState("interactiveLegend");

  const arcgisViewReadyChangeCallback = (e) => {
    const arcgisMap = e.target;
    const appProxies = base.results?.applicationItem?.value?.applicationProxies;
    const map = arcgisMap?.map as __esri.WebMap | __esri.WebScene;
    joinAppProxies(map, esriConfig, appProxies as AppProxyDefinition[]);
    setView(arcgisMap.view);
  };

  return (
    <>
      <calcite-shell>
        <Header />
        <calcite-shell-panel slot="panel-start" width="m">
          <calcite-panel
            heading={
              tool === "interactiveLegend"
                ? "Interactive Legend"
                : tool === "bookmarks"
                ? "Bookmarks"
                : tool === "export"
                ? "Export"
                : null
            }
          >
            <calcite-action
              onclick={() => {
                setTool("interactiveLegend");
              }}
              icon="legend"
              text-enabled
              text="Interactive Legend"
              slot="header-menu-actions"
            ></calcite-action>
            <calcite-action
              onclick={() => {
                setTool("bookmarks");
              }}
              icon="bookmark"
              text-enabled
              text="Bookmarks"
              slot="header-menu-actions"
            ></calcite-action>
            <calcite-action
              onclick={() => {
                setTool("export");
              }}
              icon="export"
              text-enabled
              text="Export"
              slot="header-menu-actions"
            ></calcite-action>
            {view ? (
              tool === "interactiveLegend" ? (
                <instant-apps-interactive-legend
                  className={
                    theme === "light"
                      ? "calcite-mode-light"
                      : "calcite-mode-dark"
                  }
                  view={view}
                />
              ) : tool === "bookmarks" ? (
                <arcgis-bookmarks referenceElement="arcgisMap"></arcgis-bookmarks>
              ) : tool === "export" ? (
                <instant-apps-export
                  className={
                    theme === "light"
                      ? "calcite-mode-light"
                      : "calcite-mode-dark"
                  }
                  view={view}
                  mode="inline"
                  showIncludeLegend={false}
                  showIncludePopup={false}
                  includeLegend={false}
                />
              ) : null
            ) : null}
          </calcite-panel>
        </calcite-shell-panel>
        <arcgis-map
          id="arcgisMap"
          onarcgisViewReadyChange={arcgisViewReadyChangeCallback}
          itemId={webmap}
        >
          <MapComponents />
        </arcgis-map>
      </calcite-shell>
      <Splash />
    </>
  );
}
