export function setTheme(theme: "light" | "dark"): void {
    const jsapiStyles = document.getElementById("jsapiStyles") as HTMLLinkElement;
    if (jsapiStyles == null) return;
    jsapiStyles.href = `https://js.arcgis.com/4.30/esri/themes/${theme}/main.css`;
  }