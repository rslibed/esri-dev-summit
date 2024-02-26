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

import PortalItem from "@arcgis/core/portal/PortalItem";
import Portal from "esri/portal/Portal";
import Credential from "esri/identity/Credential";
import { RootState } from "../index";

export type IPortalItem = PortalItem & {
  portal: Portal & {
    credential: Credential;
  };
};

const DEFAULT_STATE = new PortalItem() as IPortalItem;

export default function portalItem(state: IPortalItem = DEFAULT_STATE): IPortalItem {
  return state;
}

export const portalItemSelector = (state: RootState): IPortalItem => state.portalItem;
