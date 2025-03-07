import { useEffect, useRef } from "react";

import SocialShare from "./SocialShare";

import {
  useApplicationBase,
  useConfigurationSettings,
} from "src/Context/Contexts";

import { getLogoOptions } from "templates-common-library-esm/functionality/configUtils";

export default function Header() {
  const headerRef = useRef<HTMLInstantAppsHeaderElement>(null);
  const { base } = useApplicationBase();
  const { title, share, splash, theme, customTheme, configDispatch } =
    useConfigurationSettings();

  useEffect(() => {
    document.addEventListener("splashClose", () => {
      const node = headerRef?.current as HTMLInstantAppsHeaderElement;
      if (node) node.infoIsOpen = false;
    });
  }, []);

  const { logo, link } = getLogoOptions(customTheme, base.portal);

  return (
    <instant-apps-header
      ref={headerRef}
      slot="header"
      titleText={title}
      infoButton={splash}
      textColor={customTheme?.themes?.primary?.text}
      backgroundColor={customTheme?.themes?.primary?.background}
      logoImage={logo}
      logoLink={link}
    >
      <calcite-action
        id="toggleModeNode"
        text="Toggle theme"
        icon={theme === "light" ? "brightness" : "moon"}
        style={{
          "--calcite-icon-color": customTheme?.themes?.primary?.text,
        }}
        onclick={() =>
          configDispatch({
            key: "theme",
            value: theme === "light" ? "dark" : "light",
          })
        }
        slot="actions-end"
        scale="m"
        appearance="transparent"
      />
      {share ? <SocialShare /> : null}
    </instant-apps-header>
  );
}
