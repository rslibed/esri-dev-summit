import { useConfigurationSettings } from "src/Context/Contexts";
import { ComponentPosition } from "src/types/interfaces";

export default function Map() {
  const { home, homePosition, mapZoom, mapZoomPosition } =
    useConfigurationSettings();

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

  return (
    <>
      {renderHome()}
      {renderZoom()}
    </>
  );
}
