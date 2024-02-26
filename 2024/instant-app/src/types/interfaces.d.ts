// Copyright 2024 Esri
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.​

interface UIPosition {
  position: Position;
  index: number;
}
type SplashMode = "splash-modal" | "cover-page";
interface ISplashMode {
  branchValue: SplashMode;
}

type Position =
  | "bottom-leading"
  | "bottom-left"
  | "bottom-right"
  | "bottom-trailing"
  | "top-leading"
  | "top-left"
  | "top-right"
  | "top-trailing"
  | "manual";

export interface ConfigState {
  adobeLaunchAnalytics: boolean;
  adobeLaunchAnalyticsReportSuiteId: string;
  adobeLaunchAnalyticsScriptTag: string;
  appid: string;
  applySharedTheme: boolean;
  basemapSelector: string;
  basemapToggle: boolean;
  basemapTogglePosition: UIPosition;
  bookmarks: boolean;
  bookmarksPosition: UIPosition;
  compassWidget: boolean;
  compassWidgetPosition: UIPosition;
  coverPage: boolean;
  coverPageConfig: any;
  customTheme: ThemeConfig;
  customUrlParam: ICustomUrlParam;
  customURLParamName: string;
  description: string;
  disableScroll: boolean;
  extentSelector: boolean;
  extentSelectorConfig: IExtentSelector;
  googleAnalytics: boolean;
  googleAnalyticsConsent: boolean;
  googleAnalyticsConsentMsg: string;
  googleAnalyticsKey: string;
  header: boolean;
  home: boolean;
  homePosition: UIPosition;
  image: string;
  keyboardShortcuts: boolean;
  keyboardShortcutsPosition: UIPosition;
  landingPage: boolean;
  landingPageConfig: ILandingPageConfig;
  layerList: boolean;
  layerListOpenAtStart: boolean;
  layerListPosition: UIPosition;
  legend: boolean;
  legendConfig: any;
  legendOpenAtStart: boolean;
  legendPosition: UIPosition;
  locateWidget: boolean;
  locateWidgetPosition: UIPosition;
  mapA11yDesc: string;
  mapArea: boolean;
  mapAreaConfig: any;
  mapZoom: boolean;
  mapZoomPosition: UIPosition;
  noResultsMessage: string;
  reportButtonText: string;
  reportLayers: ISelectedLayer;
  reportsHeader: string;
  reportSubmittedMessage: string;
  scalebar: boolean;
  scalebarPosition: UIPosition;
  scalebarDualMode: boolean;
  splash: boolean;
  splashButtonText: string;
  splashContent: string;
  splashIsOpen: boolean;
  splashOnStart: boolean;
  splashTitle: string;
  search: boolean;
  searchConfiguration: any;
  searchOpenAtStart: boolean;
  searchPosition: UIPosition;
  share: boolean;
  shareIncludeEmbed: boolean;
  shareIncludeSocial: boolean;
  sharePosition: UIPosition;
  theme: "light" | "dark";
  title: string;
  titleLink: string;
  webmap: string;

  // Demo
  interactiveLegend: boolean;
  interactiveLegendPanel: "panel-start" | "panel-end";
}

export interface MapViewState {
  mapView: __esri.MapView;
}

export type Theme = "dark" | "light";

export interface ThemeState {
  theme: Theme;
  applySharedTheme: boolean;
}

export interface SharedTheme {
  button: { background: string; text: string };
  header: { background: string; text: string };
  logo: { small: string; link: string };
}

export interface ThemeConfig {
  applySharedTheme: boolean;
  applyPresetTheme: boolean;
  appFont?: string;
  font: string;
  logo?: string;
  logoLink?: string;
  logoScale?: "s" | "m" | "l";
  preset?: string;
  themes: ThemeSection;
}

export interface ThemeSection {
  [key: string]: ThemeValues;
}

export interface ThemeValues {
  type?: string;
  background: string | undefined;
  text: string | undefined;
}

interface ISelectedLayer {
  layers: ILayers[];
}

interface ILayers {
  id: string;
  fields: string[];
}

export interface ISanitizer {
  sanitize: (arg0: string) => string;
}

interface IGenericObject {
  [key: string]: unknown;
}

interface sharedThemeProps {
  background?: string;
  text?: string;
}

export interface IPortalProperties {
  sharedTheme?: {
    header: sharedThemeProps;
  };
}

interface ILandingPageConfig {
  alignment: string;
  backgroundColor: string;
  backgroundImageSrc: string;
  backgroundType: string;
  descriptionText: string;
  entryButtonColor: string;
  entryButtonText: string;
  iconImage: string;
  iconImageScale: string;
  subtitleText: string;
  textColor: string;
  titleText: string;
}

interface IExtentSelector {
  constraints: __esri.MapViewConstraints;
  mapRotation: number;
}

export interface ICustomUrlParam {
  layers: ILayerDef[];
}

export interface ILayerDef {
  id: string;
  sublayerId?: number;
  fields?: string[];
}
