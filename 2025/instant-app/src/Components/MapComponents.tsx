import { useConfigurationSettings } from "src/Context/Contexts";
import { ComponentPosition } from "src/types/interfaces";

export default function Map() {
  const {
    home,
    homePosition,
    mapZoom,
    mapZoomPosition,
    search,
    searchPosition,
    searchConfiguration,
  } = useConfigurationSettings();

  const getPosition = (componentPosition: ComponentPosition) => {
    return (
      typeof componentPosition === "string"
        ? componentPosition
        : componentPosition.position
    ) as __esri.UIPosition;
  };

  const renderHome = () =>
    home && <arcgis-home position={getPosition(homePosition)} />;

  const renderZoom = () =>
    mapZoom && <arcgis-zoom position={getPosition(mapZoomPosition)} />;

  const renderSearch = () =>
    search && (
      <arcgis-expand position={getPosition(searchPosition)} expanded>
        <arcgis-search
          sources={searchConfiguration?.sources || []}
          includeDefaultSourcesDisabled={true}
        />
      </arcgis-expand>
    );

  return (
    <>
      {renderHome()}
      {renderZoom()}
      {renderSearch()}
    </>
  );
}
