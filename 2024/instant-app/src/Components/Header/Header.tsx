import { FC, ReactElement, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  configParamsSelector,
  updateConfigParam,
} from "src/redux/slices/configParamsSlice";
import { portalItemSelector } from "src/redux/reducers/portalItem";

import { CalciteAction, CalciteTooltip } from "@esri/calcite-components-react";
import { InstantAppsHeader } from "@esri/instant-apps-components-react";

import { getThemeIcon, getTheme, isDark } from "src/utils/theme";

import { Configuration } from "src/Components/Configuration/Configuration";
import { handleLocalStorage } from "src/utils/localStorage";

const Header: FC = (): ReactElement => {
  const [configurationRef, setConfigurationRef] =
    useState<HTMLCalciteActionElement | null>(null);
  const { theme, title } = useSelector(configParamsSelector);
  const portalItem = useSelector(portalItemSelector);

  const dispatch = useDispatch();

  const titleText = title ?? portalItem?.title;

  const handleTheme = () => {
    return () => {
      const config = {
        key: "theme",
        value: getTheme(theme),
      };
      dispatch(updateConfigParam(config));
      handleLocalStorage("theme", getTheme(theme));
    };
  };

  return (
    <>
      <InstantAppsHeader slot="header" titleText={titleText}>
        <CalciteAction
          slot="actions-end"
          onClick={handleTheme()}
          icon={getThemeIcon(theme)}
          text="Theme"
        >
          <CalciteTooltip slot="tooltip" placement="bottom" closeOnClick={true}>
            {isDark(theme) ? "Light mode" : "Dark mode"}
          </CalciteTooltip>
        </CalciteAction>
        <CalciteAction
          ref={setConfigurationRef}
          slot="actions-end"
          icon="gear"
          text="Configure app"
        >
          <CalciteTooltip slot="tooltip" placement="bottom" closeOnClick={true}>
            Configure app
          </CalciteTooltip>
        </CalciteAction>
      </InstantAppsHeader>
      <Configuration actionEl={configurationRef as HTMLCalciteActionElement} />
    </>
  );
};

export default Header;
