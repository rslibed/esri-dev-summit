import { createContext, use } from "react";
import { IConfigurationSettingsContext, IApplicationBaseContext } from "src/types/interfaces";

export const ConfigurationSettingsContext = createContext<IConfigurationSettingsContext | null>(null);
export const ApplicationBaseContext = createContext<IApplicationBaseContext | null>(null);

export function useConfigurationSettings() {
  return use(ConfigurationSettingsContext) as IConfigurationSettingsContext;
}

export function useApplicationBase() {
  return use(ApplicationBaseContext) as IApplicationBaseContext;
}
