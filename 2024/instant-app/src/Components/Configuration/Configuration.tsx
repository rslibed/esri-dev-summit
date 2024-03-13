import { FC, ReactElement, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  configParamsSelector,
  updateConfigParam,
} from "src/redux/slices/configParamsSlice";

import {
  CalciteLabel,
  CalcitePopover,
  CalciteSwitch,
} from "@esri/calcite-components-react";

import { handleLocalStorage } from "src/utils/localStorage";

import { ConfigurationProps, Setting } from "./interfaces";
import { settingData } from "./data";

import "./Configuration.scss";

const Configuration: FC<ConfigurationProps> = ({ actionEl }): ReactElement => {
  const dispatch = useDispatch();
  const configParams = useSelector(configParamsSelector);
  const [uiData, setUIData] = useState<Setting[]>([]);

  useEffect(() => {
    const fieldNames = [
      "home",
      "mapZoom",
      "scalebar",
      "bookmarks",
      "share",
      "interactiveLegend",
    ];

    const DATA = fieldNames.map((fieldName) => {
      const label = settingData[fieldName].label;
      const value = configParams[fieldName];
      return { fieldName, label, value };
    });
    setUIData(DATA);
  }, [configParams]);

  const renderHeader = () => (
    <header>
      <h2>Configure App</h2>
    </header>
  );

  const handleSwitchChangeCallback = (key: string, value: boolean) => {
    return (e: CustomEvent) => {
      const switchEl = e.target as HTMLCalciteSwitchElement;
      switchEl.checked = !value;
      const { checked } = switchEl;
      dispatch(
        updateConfigParam({
          key,
          value: checked,
        })
      );
      handleLocalStorage(key, checked);
    };
  };

  const renderSetting = ({ fieldName, label, value }: Setting) => {
    const key = `${fieldName}-key`;
    const layout = "inline-space-between";
    const checked = value ? true : undefined;
    return (
      <CalciteLabel key={key} layout={layout}>
        {label}
        <CalciteSwitch
          onCalciteSwitchChange={handleSwitchChangeCallback(fieldName, value)}
          checked={checked}
        />
      </CalciteLabel>
    );
  };

  const renderSettings = () =>
    uiData.map((dataItem) => renderSetting(dataItem));

  const renderContent = () => (
    <div className="instant-apps__configuration">
      {renderHeader()}
      {renderSettings()}
    </div>
  );

  return (
    <CalcitePopover
      label="Configuration"
      referenceElement={actionEl}
      autoClose={true}
      placement="bottom-end"
    >
      {renderContent()}
    </CalcitePopover>
  );
};

export default Configuration;
