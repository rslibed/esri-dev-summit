// Copyright 2025 Esri
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import React from "react";

import "@esri/calcite-components/dist/types/preact";
import "@arcgis/map-components/dist/types/react.d.ts";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      // ArcGIS Map Components
      "arcgis-map": JSX.HTMLAttributes<HTMLArcgisMapElement>;
      "arcgis-home": JSX.HTMLAttributes<HTMLArcgisHomeElement>;
      "arcgis-zoom": JSX.HTMLAttributes<HTMLArcgisZoomElement>;
      "arcgis-expand": JSX.HTMLAttributes<HTMLArcgisExpandElement>;
      "arcgis-search": JSX.HTMLAttributes<HTMLArcgisSearchElement>;
      "arcgis-legend": JSX.HTMLAttributes<HTMLArcgisLegendElement>;
      "arcgis-placement": JSX.HTMLAttributes<HTMLArcgisPlacementElement>;

      // Calcite Components
      "calcite-action": JSX.HTMLAttributes<HTMLCalciteActionElement>;
      "calcite-panel": JSX.HTMLAttributes<HTMLCalcitePanelElement>;
      "calcite-shell": JSX.HTMLAttributes<HTMLCalciteShellElement>;
      "calcite-shell-panel": JSX.HTMLAttributes<HTMLCalciteShellPanelElement>;

      // Instant Apps Components
      "instant-apps-header": JSX.HTMLAttributes<HTMLInstantAppsHeaderElement>;
      "instant-apps-social-share": JSX.HTMLAttributes<HTMLInstantAppsSocialShareElement>;
      "instant-apps-splash": JSX.HTMLAttributes<HTMLInstantAppsSplashElement>;
      "instant-apps-interactive-legend": JSX.HTMLAttributes<HTMLInstantAppsInteractiveLegendElement>;
      "instant-apps-export": JSX.HTMLAttributes<HTMLInstantAppsExportElement>;
    }
  }
}
