import { ThemeConfig } from "../types/interfaces";

export function handleAppFontStyles(themeConfig: ThemeConfig): void {
    const id = "applicationFont";
    const existingStylesheet = document.getElementById(id);
    if (!!existingStylesheet) existingStylesheet.remove();
    if (!themeConfig?.appFont) return;
    const { appFont } = themeConfig;
    const styleSheet = document.createElement("style");
    styleSheet.id = id;
    styleSheet.innerHTML = `
      html,
      body,
      .esri-widget,
      .esri-input,
      instant-apps-social-share {
        --calcite-sans-family: ${appFont} !important;
        font-family: ${appFont} !important;
      }
    `;
    document.head.appendChild(styleSheet);
}