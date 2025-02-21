import { useEffect, useRef } from "react";

import SocialShare from "./SocialShare";

import { useConfigurationSettings } from "src/Context/Contexts";

export default function Header() {
  const headerRef = useRef<HTMLInstantAppsHeaderElement>(null);
  const { title, share, splash } = useConfigurationSettings();

  useEffect(() => {
    document.addEventListener("splashClose", () => {
      const node = headerRef?.current as HTMLInstantAppsHeaderElement;
      if (node) node.infoIsOpen = false;
    });
  }, []);

  return (
    <instant-apps-header ref={headerRef} slot="header" titleText={title} infoButton={splash}>
      {share ? <SocialShare /> : null}
    </instant-apps-header>
  );
}
