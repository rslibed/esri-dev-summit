export function getMessageBundlePath(componentName: string): string {
  return componentName === "Common"
    ? `${import.meta.env.BASE_URL}assets/t9n/${componentName}/common`
    : `${import.meta.env.BASE_URL}assets/t9n/${componentName}/resources`;
}

export function getDynamicStyleClass(prop: boolean, className: string): string {
  return prop ? className : "";
}

export function setLocalStorage(key: string, value: unknown): void {
  const { localStorage } = window;
  localStorage.setItem(key, JSON.stringify(value));
}

export function setMode(theme: "light" | "dark"): void {
  const jsapiStyles = document.getElementById("jsapiStyles") as HTMLLinkElement;
  jsapiStyles.href = `https://js.arcgis.com/4.29/esri/themes/${theme}/main.css`;
}

export function getLocalStorageItem(key: string): boolean {
  const item = window?.localStorage?.getItem(key);
  return item ? true : false;
}
