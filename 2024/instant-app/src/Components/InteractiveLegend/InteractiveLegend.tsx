import { InstantAppsInteractiveLegend } from "@esri/instant-apps-components-react";
import { getCalciteMode } from "src/utils/theme";

const InteractiveLegend = ({ view, theme }) => {
  return (
    <InstantAppsInteractiveLegend
      className={getCalciteMode(theme)}
      view={view?.current}
      featureCount={true}
      zoomTo={true}
    />
  );
};

export default InteractiveLegend;
