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

import { FC, ReactElement, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import "@esri/instant-apps-components/dist/components/instant-apps-keyboard-shortcuts";
import "@esri/instant-apps-components/dist/components/instant-apps-measurement";
import "@esri/instant-apps-components/dist/components/instant-apps-social-share";

import {
  addBasemap,
  addBookmarks,
  addCompass,
  addHome,
  addLayerList,
  addLegend,
  addLocateWidget,
  addScaleBar,
  addSearch,
  addShare,
  addZoom,
} from "templates-common-library-esm/functionality/esriWidgetUtils";

import "./View.scss";

import CommonT9n from "../../../t9n/common.json";

import { useMessages } from "src/hooks/useMessages";
import { mapSelector } from "src/redux/reducers/map";
import { portalItemSelector } from "src/redux/reducers/portalItem";
import { configParamsSelector } from "src/redux/slices/configParamsSlice";
import { handleTheme } from "src/utils/theme";

const CSS = {
  base: "esri-view",
  share: "esri-view__share-widget",
};

interface ViewProps {
  view: __esri.MapView;
}

const View: FC<ViewProps> = ({ view }): ReactElement => {
  const {
    basemapSelector,
    basemapToggle,
    basemapTogglePosition,
    bookmarks,
    bookmarksPosition,
    compassWidget,
    compassWidgetPosition,
    home,
    homePosition,
    layerList,
    layerListOpenAtStart,
    layerListPosition,
    legend,
    legendOpenAtStart,
    legendPosition,
    locateWidget,
    locateWidgetPosition,
    mapZoom,
    mapZoomPosition,
    scalebar,
    scalebarPosition,
    search,
    searchConfiguration,
    searchOpenAtStart,
    searchPosition,
    share,
    shareIncludeEmbed,
    shareIncludeSocial,
    sharePosition,
    theme,
  } = useSelector(configParamsSelector);
  const map = useSelector(mapSelector);
  const { portal } = useSelector(portalItemSelector);
  const commonMessages = useMessages<typeof CommonT9n>("Common");
  const mapDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapDiv.current != null) {
      view.container = mapDiv.current;
      view.map = map;
      view.ui.remove("zoom");
    }
  }, [map, view]);

  useEffect(() => {
    const config = {
      mapZoom,
      mapZoomPosition,
    };
    addZoom(config, view);
  }, [mapZoom, mapZoomPosition, view]);

  useEffect(() => {
    const map = view.map as __esri.WebMap;
    void view
      .goTo(map.initialViewProperties.viewpoint, { animate: false })
      .catch(() => {});

    const config = {
      home,
      homePosition,
    };
    addHome(config, view);
  }, [home, homePosition, view]);

  useEffect(() => {
    const config = {
      legend,
      legendOpenAtStart,
      legendPosition,
    };
    addLegend(config, view, commonMessages);
  }, [commonMessages, legend, legendOpenAtStart, legendPosition, view]);

  useEffect(() => {
    const config = {
      share,
      sharePosition,
      shareIncludeEmbed,
      shareIncludeSocial,
    };
    addShare(config, view, commonMessages);
  }, [
    commonMessages,
    share,
    sharePosition,
    shareIncludeEmbed,
    shareIncludeSocial,
    view,
  ]);

  useEffect(() => {
    const config = {
      locateWidget,
      locateWidgetPosition,
    };
    addLocateWidget(config, view);
  }, [locateWidget, locateWidgetPosition, view]);

  useEffect(() => {
    const config = {
      compassWidget,
      compassWidgetPosition,
    };
    addCompass(config, view);
  }, [compassWidget, compassWidgetPosition, view]);

  useEffect(() => {
    const config = {
      bookmarks,
      bookmarksPosition,
    };
    addBookmarks(config, view, commonMessages);
  }, [bookmarks, bookmarksPosition, commonMessages, view]);

  useEffect(() => {
    const config = {
      basemapTogglePosition,
      basemapToggle,
      basemapSelector,
    };
    addBasemap(config, view);
  }, [basemapTogglePosition, basemapToggle, basemapSelector, view, portal]);

  useEffect(() => {
    const config = {
      layerList,
      layerListPosition,
      layerListOpenAtStart,
    };
    addLayerList(config, view, commonMessages);
  }, [
    layerList,
    layerListPosition,
    layerListOpenAtStart,
    view,
    commonMessages,
  ]);

  useEffect(() => {
    const config = {
      scalebar,
      scalebarPosition,
    };
    addScaleBar(config, view);
  }, [scalebar, scalebarPosition, view, commonMessages, portal]);

  useEffect(() => {
    const config = {
      search,
      searchPosition,
      searchConfiguration,
      searchOpenAtStart,
    };

    addSearch(config, view, commonMessages);
  }, [
    search,
    searchPosition,
    searchConfiguration,
    searchOpenAtStart,
    commonMessages,
    view,
  ]);

  useEffect(() => {
    if (view.ready) handleTheme(theme, mapDiv?.current as HTMLDivElement);
  }, [theme, view?.ready]);

  return <div className={CSS.base} ref={mapDiv} />;
};

export default View;
