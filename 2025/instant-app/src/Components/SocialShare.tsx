import { useConfigurationSettings } from "src/Context/Contexts";

export default function SocialShare() {
  const { theme } = useConfigurationSettings();
  return (
    <instant-apps-social-share
      slot="actions-end"
      popoverButtonIconScale="m"
      scale="s"
      shareButtonScale="m"
      displayTipText={false}
      shareButtonColor={theme === "light" ? "inverse" : "neutral"}
    />
  );
}
