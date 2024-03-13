import { FC, ReactElement, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  configParamsSelector,
  updateConfigParam,
} from "src/redux/slices/configParamsSlice";
import { portalItemSelector } from "src/redux/reducers/portalItem";

import Configuration from "src/Components/Configuration/Configuration";

import { CalciteAction, CalciteTooltip } from "@esri/calcite-components-react";
import { InstantAppsHeader } from "@esri/instant-apps-components-react";

import { getThemeIcon, getTheme, isDark } from "src/utils/theme";
import { handleLocalStorage } from "src/utils/localStorage";

const Header: FC = (): ReactElement => {
  const dispatch = useDispatch();

  const { theme, title } = useSelector(configParamsSelector);
  const portalItem = useSelector(portalItemSelector);

  const [configurationRef, setConfigurationRef] =
    useState<HTMLCalciteActionElement | null>(null);

  const titleText = title ?? portalItem?.title;

  const renderHeader = () => (
    <InstantAppsHeader slot="header" titleText={titleText}>
      {renderThemeAction()}
      {renderConfigurationAction()}
    </InstantAppsHeader>
  );

  const handleTheme = () => {
    return () => {
      const [key, value] = ["theme", getTheme(theme)];
      const config = { key, value };
      dispatch(updateConfigParam(config));
      handleLocalStorage("theme", getTheme(theme));
    };
  };

  const renderThemeAction = () => {
    return (
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
    );
  };

  const renderConfigurationAction = () => (
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
  );

  const renderConfiguration = () => (
    <Configuration actionEl={configurationRef as HTMLCalciteActionElement} />
  );

  return (
    <>
      {renderHeader()}
      {renderConfiguration()}
    </>
  );
};

export default Header;
