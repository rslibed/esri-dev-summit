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

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setPageTitle } from "templates-common-library-esm/baseClasses/support/domHelper";
import { updateViewsCalciteMode } from "templates-common-library-esm/functionality/configUtils";
import { RootState } from "..";
import { ConfigState, Theme } from "../../types/interfaces";
import { setMode } from "../../utils/utils";

const configParamsSlice = createSlice({
  name: "configParams",
  initialState: null as unknown as ConfigState,
  reducers: {
    updateConfigParam: (state, { payload }: PayloadAction<{ key: string; value: unknown }>) => {
      const { key, value } = payload;
      if (key === "theme") {
        const mode = value as Theme;
        setMode(mode);
        updateViewsCalciteMode(mode);
      } else if (key === "title") {
        setPageTitle(value as string);
      } else if (key === "splashOnStart") {
        state.splashIsOpen = value as boolean;
      }
      state[key] = value;
    },
    updateSplashIsOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.splashIsOpen = payload;
    }
  }
});

export const { updateConfigParam, updateSplashIsOpen } = configParamsSlice.actions;
export const configParamsSelector = (state: RootState): ConfigState => state.config;
export default configParamsSlice.reducer;
