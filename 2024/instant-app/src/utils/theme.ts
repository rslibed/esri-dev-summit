type Theme = "light" | "dark";

enum ETheme {
  CalciteModeLight = "calcite-mode-light",
  CalciteModeDark = "calcite-mode-dark",
  Light = "light",
  Dark = "dark",
  LightIcon = "brightness",
  DarkIcon = "moon"
}

export function handleTheme(theme: Theme, mapDiv: HTMLDivElement) {
  const prevThemeClass = isDark(theme) ? ETheme.CalciteModeLight : ETheme.CalciteModeDark;
  const uiContainers = mapDiv?.querySelectorAll(`.${prevThemeClass}`);
  if (uiContainers != null) {
    const themeClass = isDark(theme) ? ETheme.CalciteModeDark : ETheme.CalciteModeLight;
    for (let i = 0; i < uiContainers.length; i++) {
      uiContainers[i].classList.replace(prevThemeClass, themeClass);
    }
  }
}

export function isDark(theme: Theme) {
  return theme === ETheme.Dark;
}

export function getTheme(theme: Theme) {
  return isDark(theme) ? ETheme.Light : ETheme.Dark;
}

export function getThemeIcon(theme: Theme) {
  return isDark(theme) ? ETheme.LightIcon : ETheme.DarkIcon;
}

export function getCalciteMode(theme: Theme) {
  return isDark(theme) ? ETheme.CalciteModeDark : ETheme.CalciteModeLight;
}
