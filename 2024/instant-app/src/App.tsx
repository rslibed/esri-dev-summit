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

import { FC, ReactElement, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import MapView from "@arcgis/core/views/MapView";

import Header from "./Components/Header/Header";
import View from "./Components/View/View";

import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-switch";
import "@esri/calcite-components/dist/components/calcite-tooltip";
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-modal";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import {
  CalcitePanel,
  CalciteShell,
  CalciteShellPanel,
} from "@esri/calcite-components-react";

import "./App.scss";

import { configParamsSelector } from "./redux/slices/configParamsSlice";
import {
  mobileSelector,
  toggleShowMobileMode,
} from "./redux/slices/mobileSlice";

// esri-loader override
import "./utils/require";

// Font
import { handleAppFontStyles } from "./utils/font";
import { InteractiveLegend } from "./Components/InteractiveLegend/InteractiveLegend";
import { getCalciteMode } from "./utils/theme";

const CSS = {
  body: "esri-app",
  viewContainer: "esri-view-container",
};

const App: FC = (): ReactElement => {
  const {
    header,
    theme,
    customTheme,
    interactiveLegend,
    interactiveLegendPanel,
  } = useSelector(configParamsSelector);
  useSelector(configParamsSelector);
  const { showMobileMode } = useSelector(mobileSelector);
  const view = useRef<__esri.MapView>(new MapView());
  const appContainer = useRef<HTMLDivElement>(null);
  const mobilePanel = useRef<HTMLCalcitePanelElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    handleAppFontStyles(customTheme);
  }, [customTheme]);

  useEffect(() => {
    function handleResize(): void {
      const mobileCheck = {
        height: window.innerHeight,
        width: window.innerWidth,
      };
      dispatch(toggleShowMobileMode(mobileCheck));
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  useEffect(() => {
    function handleTogglePanel(): void {
      if (mobilePanel.current != null) {
        mobilePanel.current.classList.toggle("collapse");
      }
    }
    window.addEventListener("togglePanel", handleTogglePanel);
    return () => window.removeEventListener("togglePanel", handleTogglePanel);
  }, []);

  return (
    <>
      <div ref={appContainer} className={`${getCalciteMode(theme)} App`}>
        <CalciteShell id="instant-app-container" className={CSS.body}>
          {header && <Header />}
          {!showMobileMode &&
            (interactiveLegend ? (
              <CalciteShellPanel
                slot={interactiveLegendPanel}
                position="start"
                resizable
              >
                <CalcitePanel>
                  <InteractiveLegend view={view} theme={theme} />
                </CalcitePanel>
              </CalciteShellPanel>
            ) : null)}
          <View view={view.current} />
          {showMobileMode && interactiveLegend && (
            <CalcitePanel className="mobile-panel" ref={mobilePanel}>
              <InteractiveLegend view={view} theme={theme} />
            </CalcitePanel>
          )}
        </CalciteShell>
      </div>
    </>
  );
};

export default App;
