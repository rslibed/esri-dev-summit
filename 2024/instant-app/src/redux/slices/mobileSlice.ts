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
import { RootState } from "../index";

interface MobileState {
  showMobileMode: boolean;
}

interface ShowMobileModePayload {
  height: number;
  width: number;
}

const DEFAULT_STATE: MobileState = {
  showMobileMode: false
};

const mobileSlice = createSlice({
  name: "mobile",
  initialState: DEFAULT_STATE,
  reducers: {
    toggleShowMobileMode: (state, { payload }: PayloadAction<ShowMobileModePayload>) => {
      const { height, width } = payload;
      state.showMobileMode = width < 830 || height < 500;
    }
  }
});

export const { toggleShowMobileMode } = mobileSlice.actions;
export const mobileSelector = (state: RootState): MobileState => state.mobile;
export default mobileSlice.reducer;
