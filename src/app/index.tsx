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
import { LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme.palette.mode);
  }, [theme.palette.mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ToastContainer />
          {/* <Authentication /> */}
          {loginStatus === "loggedout" && <Authentication />}

          {loginStatus === "loggedin" && <Router />}
        </LocalizationProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
