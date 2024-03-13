import { FC, ReactElement, useRef } from "react";
import { useSelector } from "react-redux";

import MapView from "@arcgis/core/views/MapView";

import Header from "./Components/Header/Header";
import View from "./Components/View/View";
import InteractiveLegend from "./Components/InteractiveLegend/InteractiveLegend";

import {
  CalcitePanel,
  CalciteShell,
  CalciteShellPanel,
} from "@esri/calcite-components-react";

import { configParamsSelector } from "./redux/slices/configParamsSlice";

import { getCalciteMode } from "./utils/theme";

import "./App.scss";

const CSS = {
  body: "esri-app",
  viewContainer: "esri-view-container",
};

const App: FC = (): ReactElement => {
  const { theme, interactiveLegend, interactiveLegendPanel } =
    useSelector(configParamsSelector);
  const view = useRef<__esri.MapView>(new MapView());
  const appContainer = useRef<HTMLDivElement>(null);

  const renderShell = () => {
    return (
      <CalciteShell id="instant-app-container" className={CSS.body}>
        <Header />
        {renderShellPanel()}
        <View view={view.current} />
      </CalciteShell>
    );
  };

  const renderShellPanel = () => {
    return interactiveLegend ? (
      <CalciteShellPanel
        slot={interactiveLegendPanel}
        position="start"
        resizable
      >
        <CalcitePanel>
          <InteractiveLegend view={view} theme={theme} />
        </CalcitePanel>
      </CalciteShellPanel>
    ) : null;
  };

  const classes = [getCalciteMode(theme), "App"].join(" ");

  return (
    <div ref={appContainer} className={classes}>
      {renderShell()}
    </div>
  );
};

export default App;
