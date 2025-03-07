import ApplicationBase from "templates-common-library-esm/baseClasses/ApplicationBase";

export type ComponentPosition = string | { position: string; index: number };

export interface IApplicationBaseContext {
  base: ApplicationBase;
}

export interface ConfigState {
  title: string;
  webmap: string;
  splash: boolean;
  splashTitle: string;
  splashContent: string;
  splashButtonText: string;
  share: boolean;
  home: boolean;
  homePosition: ComponentPosition;
  mapZoom: boolean;
  mapZoomPosition: ComponentPosition;
  legend: boolean;
  search: boolean;
  searchPosition: ComponentPosition;
  theme: "light" | "dark";
  bookmarks: boolean;
  customTheme?;
  searchConfiguration?;
}

export interface IConfigurationSettingsContext extends ConfigState {
  configDispatch: React.Dispatch<IConfigAction>;
}

interface IConfigAction {
  key: string;
  value: unknown;
}
