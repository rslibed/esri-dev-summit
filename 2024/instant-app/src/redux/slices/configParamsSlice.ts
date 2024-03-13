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
    updateConfigParam: (
      state,
      { payload }: PayloadAction<{ key: string; value: unknown }>
    ) => {
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
    },
  },
});

export const { updateConfigParam, updateSplashIsOpen } =
  configParamsSlice.actions;
export const configParamsSelector = (state: RootState): ConfigState =>
  state.config;
export default configParamsSlice.reducer;
