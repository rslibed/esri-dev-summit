export function getSavedData() {
  const data = localStorage.getItem("24ds-app") as string;
  return data ? JSON.parse(data) : {};
}

export function handleLocalStorage(key: string, value: any) {
  const data = localStorage.getItem("24ds-app");
  if (!data) {
    localStorage.setItem(
      "24ds-app",
      JSON.stringify({
        [key]: value,
      })
    );
  } else {
    const updatedData = JSON.parse(data);
    localStorage.setItem(
      "24ds-app",
      JSON.stringify({
        ...updatedData,
        [key]: value,
      })
    );
  }
}
