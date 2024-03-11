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

import { FC, ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  configParamsSelector,
  updateConfigParam,
} from "../../redux/slices/configParamsSlice";
import { portalItemSelector } from "../../redux/reducers/portalItem";

import "@esri/instant-apps-components/dist/components/instant-apps-header";
import { InstantAppsHeader } from "@esri/instant-apps-components-react";
import { CalciteAction, CalciteTooltip } from "@esri/calcite-components-react";
import { getThemeIcon, getTheme, isDark } from "src/utils/theme";
import { Configuration } from "../Configuration/Configuration";
import { handleLocalStorage } from "src/utils/localStorage";

const Header: FC = (): ReactElement => {
  const [configurationRef, setConfigurationRef] =
    useState<HTMLCalciteActionElement | null>(null);
  const { theme, title } = useSelector(configParamsSelector);
  const portalItem = useSelector(portalItemSelector);

  const dispatch = useDispatch();

  const titleText = title?.length > 0 ? title : portalItem?.title;

  return (
    <>
      <InstantAppsHeader slot="header" titleText={titleText}>
        <CalciteAction
          onClick={() => {
            const config = {
              key: "theme",
              value: getTheme(theme),
            };
            dispatch(updateConfigParam(config));
            handleLocalStorage("theme", getTheme(theme));
          }}
          slot="actions-end"
          icon={getThemeIcon(theme)}
          text=""
        >
          <CalciteTooltip slot="tooltip" placement="bottom" closeOnClick={true}>
            {isDark(theme) ? "Light mode" : "Dark mode"}
          </CalciteTooltip>
        </CalciteAction>
        <CalciteAction
          ref={setConfigurationRef}
          slot="actions-end"
          icon="gear"
          text=""
        >
          <CalciteTooltip slot="tooltip" placement="bottom" closeOnClick={true}>
            Configure app
          </CalciteTooltip>
        </CalciteAction>
      </InstantAppsHeader>
      <Configuration actionEl={configurationRef} />
    </>
  );
};

export default Header;
