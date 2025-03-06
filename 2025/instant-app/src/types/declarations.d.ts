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
import React from "react";

import "@esri/calcite-components/dist/types/preact";
import "@arcgis/map-components/dist/types/react.d.ts";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      // ArcGIS Map Components
      "arcgis-map": JSX.HTMLAttributes<HTMLArcgisMapElement>;
      "arcgis-scene": JSX.HTMLAttributes<HTMLArcgisSceneElement>;
      "arcgis-home": JSX.HTMLAttributes<HTMLArcgisHomeElement>;
      "arcgis-zoom": JSX.HTMLAttributes<HTMLArcgisZoomElement>;
      "arcgis-expand": JSX.HTMLAttributes<HTMLArcgisExpandElement>;
      "arcgis-search": JSX.HTMLAttributes<HTMLArcgisSearchElement>;
      "arcgis-legend": JSX.HTMLAttributes<HTMLArcgisLegendElement>;
      "arcgis-placement": JSX.HTMLAttributes<HTMLArcgisPlacementElement>;

      // Calcite Components
      "calcite-action": JSX.HTMLAttributes<HTMLCalciteActionElement>;
      "calcite-action-pad": JSX.HTMLAttributes<HTMLCalciteActionPadElement>;
      "calcite-action-bar": JSX.HTMLAttributes<HTMLCalciteActionBarElement>;
      "calcite-action-group": JSX.HTMLAttributes<HTMLCalciteActionGroupElement>;
      "calcite-block": JSX.HTMLAttributes<HTMLCalciteBlockElement>;
      "calcite-button": JSX.HTMLAttributes<HTMLCalciteButtonElement>;
      "calcite-checkbox": JSX.HTMLAttributes<HTMLCalciteCheckboxElement>;
      "calcite-dropdown": JSX.HTMLAttributes<HTMLCalciteDropdownElement>;
      "calcite-dropdown-group": JSX.HTMLAttributes<HTMLCalciteDropdownGroupElement>;
      "calcite-dropdown-item": JSX.HTMLAttributes<HTMLCalciteDropdownItemElement>;
      "calcite-icon": JSX.HTMLAttributes<HTMLCalciteIconElement>;
      "calcite-input": JSX.HTMLAttributes<HTMLCalciteInputElement>;
      "calcite-label": JSX.HTMLAttributes<HTMLCalciteLabelElement>;
      "calcite-list": JSX.HTMLAttributes<HTMLCalciteListElement>;
      "calcite-list-item": JSX.HTMLAttributes<HTMLCalciteListItemElement>;
      "calcite-dialog": JSX.HTMLAttributes<HTMLCalciteDialogElement>;
      "calcite-panel": JSX.HTMLAttributes<HTMLCalcitePanelElement>;
      "calcite-popover": JSX.HTMLAttributes<HTMLCalcitePopoverElement>;
      "calcite-shell": JSX.HTMLAttributes<HTMLCalciteShellElement>;
      "calcite-shell-panel": JSX.HTMLAttributes<HTMLCalciteShellPanelElement>;
      "calcite-switch": JSX.HTMLAttributes<HTMLCalciteSwitchElement>;
      "calcite-tooltip": JSX.HTMLAttributes<HTMLCalciteTooltipElement>;

      // Instant Apps Components
      "instant-apps-export-views": JSX.HTMLAttributes<HTMLInstantAppsExportViewsElement>;
      "instant-apps-header": JSX.HTMLAttributes<HTMLInstantAppsHeaderElement>;
      "instant-apps-keyboard-shortcuts": JSX.HTMLAttributes<HTMLInstantAppsKeyboardShortcutsElement>;
      "instant-apps-landing-page": JSX.HTMLAttributes<HTMLInstantAppsLandingPageElement>;
      "instant-apps-language-switcher": JSX.HTMLAttributes<HTMLInstantAppsLanguageSwitcherElement>;
      "instant-apps-social-share": JSX.HTMLAttributes<HTMLInstantAppsSocialShareElement>;
      "instant-apps-splash": JSX.HTMLAttributes<HTMLInstantAppsSplashElement>;
      "instant-apps-interactive-legend": JSX.HTMLAttributes<HTMLInstantAppsInteractiveLegendElement>;
      "instant-apps-export": JSX.HTMLAttributes<HTMLInstantAppsExportElement>;
    }
  }
}
