import { getT9nData } from "templates-common-library-esm/structuralFunctionality/language-switcher/support/utils";

import { useApplicationBase, useConfigurationSettings } from "src/Context/Contexts";

export default function LanguageSwitcher() {
  const { base } = useApplicationBase();
  const { languageSwitcherConfig, configDispatch } = useConfigurationSettings();

  const selectedLanguageUpdatedCallback = async (e: CustomEvent) => {
    const t9nData = await getT9nData(e.detail, base);
    batchUpdateStore(t9nData);
  };

  const batchUpdateStore = (configToUpdate: { [key: string]: any }) => {
    for (const key in configToUpdate) {
      console.log(key);
      const value = configToUpdate[key];
      configDispatch({ key, value });
    }
  };

  return (
    <arcgis-placement>
      <instant-apps-language-switcher
        defaultLocale={languageSwitcherConfig?.defaultLocale}
        icon={languageSwitcherConfig?.icon}
        locales={languageSwitcherConfig?.locales}
        portalItem={base?.results?.applicationItem?.value}
        onSelectedLanguageUpdated={selectedLanguageUpdatedCallback}
      />
    </arcgis-placement>
  );
}
