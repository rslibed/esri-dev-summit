export function setTheme(theme: "light" | "dark"): void {
  const jsapiStyles = document.getElementById("esriStyles") as HTMLLinkElement;
  const esriUI = document.querySelector(".esri-ui");

  const oppositeTheme = theme === "light" ? "dark" : "light";

  document.body.classList.remove(`calcite-mode-${oppositeTheme}`);
  esriUI?.classList.remove(`calcite-mode-${oppositeTheme}`);
  document.body.classList.add(`calcite-mode-${theme}`);
  esriUI?.classList.add(`calcite-mode-${theme}`);

  if (jsapiStyles) {
    jsapiStyles.href = `https://js.arcgis.com/4.32/esri/themes/${theme}/main.css`;
  }
}
