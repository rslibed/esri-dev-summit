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

  const getText = (id) => {
    switch (id) {
      case "interactiveLegend":
        return "Interactive Legend";
      case "bookmarks":
        return "Bookmarks";
      case "export":
        return "Export";
      default:
        return null;
    }
  };

  const renderMenuActions = () => {
    const actions = [
      { id: "interactiveLegend", icon: "legend" },
      { id: "bookmarks", icon: "bookmark" },
      { id: "export", icon: "export" },
    ];

    return actions
      .filter((action) => action.id !== tool)
      .map(({ id, icon }) => (
        <calcite-action
          onclick={() => setTool(id)}
          icon={icon}
          text-enabled
          text={getText(id)}
          slot="header-menu-actions"
        ></calcite-action>
      ));
  };

  const renderShellPanel = () => (
    <calcite-shell-panel slot="panel-start" width="m">
      <calcite-panel heading={getText(tool)}>
        {renderMenuActions()}
        {renderTool()}
      </calcite-panel>
    </calcite-shell-panel>
  );
  const renderTool = () => {
    if (!view) return null;
    const mode = theme === "light" ? "calcite-mode-light" : "calcite-mode-dark";
    switch (tool) {
      case "bookmarks":
        return <arcgis-bookmarks referenceElement="arcgisMap" />;
      case "interactiveLegend":
        return <instant-apps-interactive-legend className={mode} view={view} />;
      case "export":
        return (
          <instant-apps-export
            className={mode}
            view={view}
            mode="inline"
            showIncludeLegend={false}
            showIncludePopup={false}
            includeLegend={false}
          />
        );
      default:
        return null;
    }
  };

  const renderMap = () => {
    return (
      <arcgis-map
        id="arcgisMap"
        onarcgisViewReadyChange={arcgisViewReadyChangeCallback}
        itemId={webmap}
      >
        <MapComponents />
      </arcgis-map>
    );
  };

  const renderSplash = () => (splash && splashContent ? <Splash /> : null);

  return (
    <>
      <calcite-shell>
        <Header />
        {renderShellPanel()}
        {renderMap()}
      </calcite-shell>
      {renderSplash()}
    </>
  );
}
