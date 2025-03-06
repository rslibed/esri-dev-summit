import { ReactElement, useEffect, useReducer } from "react";

import { setPageTitle } from "templates-common-library-esm/baseClasses/support/domHelper";

import { ConfigurationSettingsContext } from "src/Context/Contexts";
import { ConfigState, IConfigAction } from "src/types/interfaces";
import { setTheme } from "src/utils/utils";

interface ConfigurationSettingsProviderProps {
  config: ConfigState;
  children: ReactElement;
}

function reducer(state: ConfigState, action: IConfigAction): ConfigState {
  switch (action.key) {
    case "theme": {
      const theme = action.value as "light" | "dark";
      setTheme(theme);
      return { ...state, theme };
    }
    case "title": {
      const title = action.value as string;
      setPageTitle(title);
      return { ...state, title };
    }
    default: {
      return { ...state, [action.key]: action.value };
    }
  }
}

const initialState = {};

const ConfigurationSettingsProvider = ({
  config,
  children,
}: ConfigurationSettingsProviderProps): ReactElement => {
  const [state, configDispatch] = useReducer(reducer, {
    ...initialState,
    ...config,
  });

  useEffect(() => {
    const handleConfigurationUpdates = (e: MessageEvent) => {
      const type = e?.data?.type;
      if (type === "cats-app") {
        const dataKeys = Object.keys(e.data)?.filter((key) => key !== "type");
        for (const key of dataKeys) {
          if (e.data[key] === undefined) return;
          const value = e.data[key];
          configDispatch({ key, value });
        }
      }
    };
    const withinConfigurationExperience: boolean =
      window.location !== window.parent.location;
    if (withinConfigurationExperience)
      window.addEventListener("message", handleConfigurationUpdates, false);
  }, []);

  return (
    <ConfigurationSettingsContext
      value={{
        ...state,
        configDispatch,
      }}
    >
      {children}
    </ConfigurationSettingsContext>
  );
};

export default ConfigurationSettingsProvider;
