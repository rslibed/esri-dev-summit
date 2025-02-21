import Header from "./Components/Header";
import Splash from "./Components/Splash";
import Map from "./Components/Map";

import { useConfigurationSettings } from "./Context/Contexts";

export default function App() {
  const { splash } = useConfigurationSettings();

  return (
    <calcite-shell>
      <Map />
      <Header />
      {splash ? <Splash /> : null}
    </calcite-shell>
  );
}
