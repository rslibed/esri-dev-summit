import { RootState } from "../index";

const DEFAULT_STATE: any = null;

export default function map(state = DEFAULT_STATE): __esri.WebMap {
  return state;
}

export const mapSelector = (state: RootState) => state.map;
