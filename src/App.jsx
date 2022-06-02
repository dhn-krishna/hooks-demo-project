import { CssBaseline, ThemeProvider } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import RTL from "components/RTL";
import useSettings from "hooks/useSettings";
import { Toaster } from "react-hot-toast";
import { useRoutes } from "react-router-dom";
import "./i18n";
import routes from "./routes";
import { ukoTheme } from "./theme";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak";

const App = () => {
  const allPages = useRoutes(routes);
  const { settings } = useSettings(); // App theme

  const appTheme = ukoTheme({
    theme: settings.theme,
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
  }); // toaster options

  const toasterOptions = {
    style: {
      fontWeight: 500,
      fontFamily: "'Montserrat', sans-serif",
    },
  };
  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={appTheme}>
          <RTL direction={appTheme.direction}>
            <CssBaseline />
            <Toaster toastOptions={toasterOptions} />
            {allPages}
          </RTL>
        </ThemeProvider>
      </StyledEngineProvider>
    </ReactKeycloakProvider>
  );
};

export default App;
