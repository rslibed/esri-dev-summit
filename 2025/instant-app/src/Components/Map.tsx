import { useState } from "react";

import esriConfig from "@arcgis/core/config";
import {
  useApplicationBase,
  useConfigurationSettings,
} from "src/Context/Contexts";
import { ComponentPosition } from "src/types/interfaces";
import { joinAppProxies } from "templates-common-library-esm/functionality/proxy";

import LanguageSwitcher from "./LanguageSwitcher";
import { AppProxyDefinition } from "templates-common-library-esm/interfaces/applicationBase";

export default function Map() {
  const { base } = useApplicationBase();
  const {
    webmap,
    home,
    homePosition,
    mapZoom,
    mapZoomPosition,
    legend,
    legendPosition,
    search,
    searchPosition,
    languageSwitcher,
    languageSwitcherConfig,
    languageSwitcherPosition,
  } = useConfigurationSettings();

  const [viewReady, setViewReady] = useState(false);

  const getPosition = (componentPosition: ComponentPosition) => {
    return typeof componentPosition === "string"
      ? componentPosition
      : componentPosition.position;
  };

  const renderHome = () =>
    home && <arcgis-home position={getPosition(homePosition)} />;

  const renderZoom = () =>
    mapZoom && <arcgis-zoom position={getPosition(mapZoomPosition)} />;

  const renderSearch = () =>
    search && (
      <arcgis-expand position={getPosition(searchPosition)}>
        <arcgis-search />
      </arcgis-expand>
    );

  const renderLegend = () =>
    legend && (
      <arcgis-expand position={getPosition(legendPosition)}>
        <arcgis-legend />
      </arcgis-expand>
    );

  const renderLanguageSwitcher = () =>
    languageSwitcher && (
      <arcgis-expand
        position={getPosition(languageSwitcherPosition)}
        expandIcon={languageSwitcherConfig?.icon}
      >
        <LanguageSwitcher />
      </arcgis-expand>
    );

  const renderComponents = () =>
    viewReady && (
      <>
        {renderHome()}
        {renderZoom()}
        {renderSearch()}
        {renderLegend()}
        {renderLanguageSwitcher()}
      </>
    );

  const arcgisViewReadyChangeCallback = (e) => {
    setTimeout(() => {
      const arcgisMap = e.target;
      const appProxies =
        base.results?.applicationItem?.value?.applicationProxies;
      const map = arcgisMap?.map as __esri.WebMap | __esri.WebScene;
      joinAppProxies(map, esriConfig, appProxies as AppProxyDefinition[]);
      setViewReady(true);
    }, 1000);
  };

  return (
    <arcgis-map
      onArcgisViewReadyChange={arcgisViewReadyChangeCallback}
      itemId={webmap}
    >
      {renderComponents()}
    </arcgis-map>
  );
}
