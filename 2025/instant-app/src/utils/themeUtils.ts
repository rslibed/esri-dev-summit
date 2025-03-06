export function setTheme(theme: "light" | "dark"): void {
  const jsapiStyles = document.getElementById("esriStyles") as HTMLLinkElement;
  const esriUI = document.querySelector(".esri-ui");

  if (!jsapiStyles || !esriUI) return;
  document.body.classList.remove(
    `calcite-mode-${theme === "light" ? "dark" : "light"}`
  );
  esriUI.classList.remove(
    `calcite-mode-${theme === "light" ? "dark" : "light"}`
  );
  document.body.classList.add(`calcite-mode-${theme}`);
  esriUI.classList.add(`calcite-mode-${theme}`);
  jsapiStyles.href = `https://js.arcgis.com/4.32/esri/themes/${theme}/main.css`;
}
