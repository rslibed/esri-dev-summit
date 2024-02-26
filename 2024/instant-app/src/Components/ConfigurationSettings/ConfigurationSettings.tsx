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

import { FC, ReactElement, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { configParamsSelector, updateConfigParam } from "../../redux/slices/configParamsSlice";
import { IGenericObject } from "src/types/interfaces";

const ConfigurationSettings: FC = (): ReactElement => {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const { mapArea } = useSelector(configParamsSelector);
  const [isMapArea, setIsMapArea] = useState<boolean>(mapArea);
  const dispatch = useDispatch();

  useEffect(() => {
    function debounce(): void {
      if (debounceTimeout.current != null) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        if (isMapArea != null) {
          dispatch(updateConfigParam({ key: "mapArea", value: isMapArea }));
        }
      }, 750);
    }
    debounce();
  }, [dispatch, isMapArea]);

  useEffect(() => {
    function handleConfigurationUpdates(e: MessageEvent): void {
      const data = e?.data as IGenericObject;
      if (data?.type === "cats-app") {
        const dataKeys = Object.keys(data);
        const key = dataKeys.filter((key) => key !== "type")[0];
        const positionKeys = dataKeys.filter((key) => key.includes("Position"));
        if (positionKeys.length > 0) {
          positionKeys.forEach((key) => {
            dispatch(updateConfigParam({ key, value: data[key] }));
          });
        } else if (key === "mapArea") {
          setIsMapArea(data[key] as boolean);
        } else if (dataKeys.includes("mapAreaConfig")) {
          dispatch(updateConfigParam({ key: "mapAreaConfig", value: data?.mapAreaConfig }));
          dispatch(updateConfigParam({ key: "extentSelector", value: data?.extentSelector }));
          dispatch(
            updateConfigParam({ key: "extentSelectorConfig", value: data?.extentSelectorConfig })
          );
        } else {
          dispatch(updateConfigParam({ key, value: data[key] }));
        }
      }
    }
    const withinConfigurationExperience: boolean = window.location !== window.parent.location;
    if (withinConfigurationExperience) {
      window.addEventListener("message", handleConfigurationUpdates, false);
    }

    return () => {
      window.removeEventListener("message", handleConfigurationUpdates, false);
    };
  }, [dispatch]);

  return <></>;
};

export default ConfigurationSettings;
