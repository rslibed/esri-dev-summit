import { FC, ReactElement, useEffect, useRef } from "react";

import { useSelector } from "react-redux";
import { useMessages } from "src/hooks/useMessages";
import { mapSelector } from "src/redux/reducers/map";
import { portalItemSelector } from "src/redux/reducers/portalItem";
import { configParamsSelector } from "src/redux/slices/configParamsSlice";

import {
  addBookmarks,
  addHome,
  addScaleBar,
  addShare,
  addZoom,
} from "templates-common-library-esm/functionality/esriWidgetUtils";

import { handleTheme } from "src/utils/theme";

import { ViewProps } from "./interfaces";

import CommonT9n from "../../../t9n/common.json";

import "./View.scss";
import { whenOnce } from "@arcgis/core/core/reactiveUtils";

const CSS = {
  base: "esri-view",
  share: "esri-view__share-widget",
};

const View: FC<ViewProps> = ({ view }): ReactElement => {
  const {
    bookmarks,
    bookmarksPosition,
    home,
    homePosition,
    mapZoom,
    mapZoomPosition,
    scalebar,
    scalebarPosition,
    share,
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
      share,
      sharePosition,
    };
    addShare(config, view, commonMessages);
  }, [commonMessages, share, sharePosition, view]);

  useEffect(() => {
    const config = {
      bookmarks,
      bookmarksPosition,
    };
    addBookmarks(config, view, commonMessages);
  }, [bookmarks, bookmarksPosition, commonMessages, view]);

  useEffect(() => {
    const config = {
      scalebar,
      scalebarPosition,
    };
    addScaleBar(config, view);
  }, [scalebar, scalebarPosition, view, commonMessages, portal]);

  useEffect(() => {
    if (!view.ready) {
      whenOnce(() => view?.ready).then(() =>
        handleTheme(theme, mapDiv?.current as HTMLDivElement)
      );
    } else {
      handleTheme(theme, mapDiv?.current as HTMLDivElement);
    }
  }, [theme, view?.ready]);

  return <div className={CSS.base} ref={mapDiv} />;
};

export default View;
