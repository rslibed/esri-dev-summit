import "@esri/instant-apps-components/dist/components/instant-apps-interactive-legend";
import { InstantAppsInteractiveLegend } from "@esri/instant-apps-components-react";

export const InteractiveLegend = ({ view, theme }) => {
  return (
    <InstantAppsInteractiveLegend
      className={theme === "dark" ? "calcite-mode-dark" : "calcite-mode-light"}
      view={view?.current}
      feature-count={true}
      zoom-to={true}
    />
  );
};
