import { CssBaseline } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

import { useLoggedIn, useLoggedInUpdate } from "../loggedInContext";
import { ColorModeContext, useMode } from "../theme";
import "react-toastify/dist/ReactToastify.css";
import "./style.scss";
import { setUser } from "../utils/session";

import Router from "./router";
import API_CALL from "../services";
import Authentication from "../components/login";

function App(): JSX.Element {
  const [theme, colorMode] = useMode();

  const setloginStatus = useLoggedInUpdate();
  const loginStatus = useLoggedIn();

  const isLoggedIn = async () => {
    try {
      const { data: res } = await API_CALL.isLoggedIn();
      setUser(res.data.user);

      if ((res.data.user.role === "user") || res.data.user.role === "admin") setloginStatus("loggedin");
    } catch (error: unknown) {
      setloginStatus("loggedout");
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme.palette.mode);
  }, [theme.palette.mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer />
        {/* <Authentication /> */}
        {loginStatus === "loggedout" && <Authentication />}

        {loginStatus === "loggedin" && <Router />}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
