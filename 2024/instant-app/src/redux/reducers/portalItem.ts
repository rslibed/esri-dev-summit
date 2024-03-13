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

export default function portalItem(
  state: IPortalItem = DEFAULT_STATE
): IPortalItem {
  return state;
}

export const portalItemSelector = (state: RootState): IPortalItem =>
  state.portalItem;
