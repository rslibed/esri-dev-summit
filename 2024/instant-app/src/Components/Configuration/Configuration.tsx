import { useDispatch, useSelector } from "react-redux";
import "./Configuration.scss";

import {
  CalciteLabel,
  CalcitePopover,
  CalciteSwitch,
} from "@esri/calcite-components-react";
import {
  configParamsSelector,
  updateConfigParam,
} from "src/redux/slices/configParamsSlice";
import { handleLocalStorage } from "src/utils/localStorage";

export const Configuration = (props: {
  actionEl: HTMLCalciteActionElement;
}) => {
  const dispatch = useDispatch();
  const { home, mapZoom, scalebar, bookmarks, interactiveLegend, share } =
    useSelector(configParamsSelector);

  const handleSwitchChangeCallback = (key: string, value: boolean) => {
    return (e: CustomEvent) => {
      const switchEl = e.target as HTMLCalciteSwitchElement;
      switchEl.checked = !value;
      dispatch(
        updateConfigParam({
          key,
          value: switchEl.checked,
        })
      );
      handleLocalStorage(key, switchEl.checked);
    };
  };

  return (
    <CalcitePopover
      label="Configuration"
      referenceElement={props.actionEl}
      autoClose={true}
      placement="bottom-end"
    >
      <div className="instant-apps__configuration">
        <header>
          <h2>Configure App</h2>
        </header>
        <CalciteLabel key="home" layout="inline-space-between">
          Home
          <CalciteSwitch
            onCalciteSwitchChange={handleSwitchChangeCallback("home", home)}
            checked={home ? true : undefined}
          />
        </CalciteLabel>
        <CalciteLabel key="zoom" layout="inline-space-between">
          Zoom
          <CalciteSwitch
            onCalciteSwitchChange={handleSwitchChangeCallback(
              "mapZoom",
              mapZoom
            )}
            checked={mapZoom ? true : undefined}
          />
        </CalciteLabel>
        <CalciteLabel key="scalebar" layout="inline-space-between">
          Scalebar
          <CalciteSwitch
            onCalciteSwitchChange={handleSwitchChangeCallback(
              "scalebar",
              scalebar
            )}
            checked={scalebar ? true : undefined}
          />
        </CalciteLabel>
        <CalciteLabel key="bookmarks" layout="inline-space-between">
          Bookmarks
          <CalciteSwitch
            onCalciteSwitchChange={handleSwitchChangeCallback(
              "bookmarks",
              bookmarks
            )}
            checked={bookmarks ? true : undefined}
          />
        </CalciteLabel>
        <CalciteLabel key="share" layout="inline-space-between">
          Share
          <CalciteSwitch
            onCalciteSwitchChange={handleSwitchChangeCallback("share", share)}
            checked={share ? true : undefined}
          />
        </CalciteLabel>
        <CalciteLabel key="interactiveLegend" layout="inline-space-between">
          Interactive legend
          <CalciteSwitch
            onCalciteSwitchChange={handleSwitchChangeCallback(
              "interactiveLegend",
              interactiveLegend
            )}
            checked={interactiveLegend ? true : undefined}
          />
        </CalciteLabel>
      </div>
    </CalcitePopover>
  );
};
