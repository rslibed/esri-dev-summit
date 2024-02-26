// Copyright 2024 Esri
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

export function getMessageBundlePath(componentName: string): string {
  return componentName === "Common"
    ? `${import.meta.env.BASE_URL}assets/t9n/${componentName}/common`
    : `${import.meta.env.BASE_URL}assets/t9n/${componentName}/resources`;
}

export function getDynamicStyleClass(prop: boolean, className: string): string {
  return prop ? className : "";
}

export function getTheme(theme: "light" | "dark"): "light" | "dark" {
  return theme === "light" ? "light" : "dark";
}

export function setLocalStorage(key: string, value: unknown): void {
  const { localStorage } = window;
  localStorage.setItem(key, JSON.stringify(value));
}

export function setMode(theme: "light" | "dark"): void {
  const jsapiStyles = document.getElementById("jsapiStyles") as HTMLLinkElement;
  jsapiStyles.href = `https://js.arcgis.com/4.29/esri/themes/${theme}/main.css`;
}

export function setTheme(theme: "light" | "dark"): void {
  const jsapiStyles = document.getElementById("jsapiStyles") as HTMLLinkElement;
  jsapiStyles.href = `https://js.arcgis.com/4.29/esri/themes/${theme}/main.css`;
}

export function getLocalStorageItem(key: string): boolean {
  const item = window?.localStorage?.getItem(key);
  return item ? true : false;
}
