import { useConfigurationSettings } from "src/Context/Contexts";

export default function SocialShare() {
  const { customTheme, theme } = useConfigurationSettings();
  return (
    <instant-apps-social-share
      slot="actions-end"
      popoverButtonIconScale="m"
      scale="s"
      shareButtonScale="m"
      displayTipText={false}
      shareButtonColor={
        customTheme && theme === "light" ? "inverse" : "neutral"
      }
    />
  );
}
