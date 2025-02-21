import { useConfigurationSettings } from "src/Context/Contexts";

export default function Splash() {
  const { splashTitle, splashContent, splashButtonText } = useConfigurationSettings();

  return (
    <instant-apps-splash
      key="instant-apps-splash"
      ref={(node) => {
        document.addEventListener("infoIsOpenChanged", (e: any) => {
          if (node) node.open = e.detail;
        });
      }}
      titleText={splashTitle}
      content={splashContent}
      primaryButtonText={splashButtonText}
      localStorageKey="iac-react-starter"
    />
  );
}
