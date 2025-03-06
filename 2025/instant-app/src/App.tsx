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

  const { webmap, splash, splashContent } = useConfigurationSettings();

  const [view, setView] = useState(null);
  const [tool, setTool] = useState("interactiveLegend");

  const arcgisViewReadyChangeCallback = (e) => {
    const arcgisMap = e.target;
    const appProxies = base.results?.applicationItem?.value?.applicationProxies;
    const map = arcgisMap?.map as __esri.WebMap | __esri.WebScene;
    joinAppProxies(map, esriConfig, appProxies as AppProxyDefinition[]);
    setView(arcgisMap.view);
  };

  const renderMenuActions = () => {
    const actions = [
      { id: "interactiveLegend", icon: "legend", text: "Interactive Legend" },
      { id: "bookmarks", icon: "bookmark", text: "Bookmarks" },
      { id: "export", icon: "export", text: "Export" },
    ];

    return actions
      .filter((action) => action.id !== tool)
      .map(({ id, icon, text }) => (
        <calcite-action
          onclick={() => setTool(id)}
          icon={icon}
          text-enabled
          text={text}
          slot="header-menu-actions"
        ></calcite-action>
      ));
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
            {renderMenuActions()}
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
      {splash && splashContent ? <Splash /> : null}
    </>
  );
}
