import { ReactElement } from "react";
import { ApplicationBaseContext } from "src/Context/Contexts";
import ApplicationBase from "templates-common-library-esm/baseClasses/ApplicationBase";

interface ApplicationBaseProviderProps {
  base: ApplicationBase;
  children: ReactElement;
}

const ApplicationBaseProvider = ({
  children,
  base
}: ApplicationBaseProviderProps): ReactElement => {
  return <ApplicationBaseContext value={{ base }}>{children}</ApplicationBaseContext>;
};

export default ApplicationBaseProvider;
