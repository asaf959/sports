import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { removeUser, setUser } from "../../utils/session";
import API_CALL from "../../services";
import { useLoggedInUpdate } from "../../loggedInContext";
import AuthForm, { Error, Field, Name, onSubmit } from "./authForm";

type Page = "login" | "register" | "forgotpassword" | "resetpassword" | "verifyemail"
interface PageData {
  title: string;
  text: string;
  buttonText: string;
  loadingButtonText: string;
  login?: boolean;
  forgot?: boolean;
  register?: boolean;
  inputs?: Field[]
}

type Pages = Record<Partial<Page>, PageData>

const pageData: Pages = {
  login: {
    title: "Login to Account",
    text: "Please enter your email and password to continue",
    buttonText: "Login",
    loadingButtonText: "Logging in...",
    forgot: true,
    register: true,
    inputs: [
      { label: "Email", type: "email", name: "email" },
      { label: "Password", type: "password", name: "password" },
    ]
  },
  register: {
    title: "Create your account",
    text: "Please enter your email and password to continue",
    buttonText: "Sign up",
    loadingButtonText: "Signing up...",
    login: true,
    forgot: true,
    inputs: [
      { label: "Email", type: "email", name: "email" },
      { label: "Password", type: "password", name: "password" },
      { label: "Confirm Password", type: "password", name: "passwordConfirm" },
    ]
  },
  forgotpassword: {
    title: "Forgot Password?",
    text: "Please enter your email below to recover account",
    buttonText: "Send email",
    loadingButtonText: "Sending email...",
    register: true,
    inputs: [
      { label: "Email", type: "email", name: "email" },
    ]
  },
  resetpassword: {
    title: "Reset Password",
    text: "Please enter your password below to recover your account",
    buttonText: "Reset",
    loadingButtonText: "Resetting...",
    login: true,
    inputs: [
      { label: "Password", type: "password", name: "password" },
      { label: "Confirm Password", type: "password", name: "passwordConfirm" },
    ]
  },
  verifyemail: {
    title: "Verify Email",
    text: "Please click on the button below to verify your email",
    buttonText: "Verify",
    loadingButtonText: "Verifying...",
    login: true
  }
}


function Authentication() {
  const [page, setPage] = useState<Page>("login");
  const currentPage = pageData[page]
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<Error>({ state: null, message: "" });
  const setloginStatus = useLoggedInUpdate();

  const isVerifyToken = window.location.search.includes("verify-token")
  const isResetToken = window.location.search.includes("reset-token")

  useEffect(() => {
    if (isResetToken) {
      setPage("resetpassword")
    } else if (isVerifyToken) {
      setPage("verifyemail")
    }
  }, [isResetToken, isVerifyToken]);

  useEffect(() => {
    setAlert({ state: null, message: "" });
  }, [page]);

  const clearAlert = () => {
    setAlert(prev => ({ state: prev === null ? undefined : null }));
  };

  const login = async (data: Partial<Record<Name, string>>) => {
    if (!data.email) {
      setAlert({ state: "error", message: "Email cannot be empty" });
    } else if (!data.password) {
      setAlert({ state: "error", message: "Password cannot be empty" });
    } else {
      setLoading(true);
      try {
        const { data: res } = await API_CALL.login({ email: data.email, password: data.password });
        if (res.message) setAlert({ state: "info", message: res.message });
        const isPermitted = res.data?.user.role === "moderator" || res.data?.user.role === "admin"
        if (res.data?.user.isVerified && isPermitted) {
          setloginStatus("loggedin");
          setUser(res.data.user);
        } else {
          if (!res.data?.user.isVerified) {
            setAlert({ state: "info", message: res.message });
          } else {
            setAlert({ state: "info", message: "Contact admin to grant you the access" });
          }
          await logout()
        }
        setLoading(false);

        return res;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        const msg = err.response.data.message.split(":")
        setAlert({ state: "error", message: msg[msg.length - 1] });
        setLoading(false);
      }
    }

    return null;
  };

  const register = async (data: Partial<Record<Name, string>>) => {
    if (!data.email) {
      setAlert({ state: "error", message: "Email cannot be empty" });
    } else if (!data.password) {
      setAlert({ state: "error", message: "Password cannot be empty" });
    } else if (!data.passwordConfirm) {
      setAlert({ state: "error", message: "Confirm Password cannot be empty" })
    } else {
      setLoading(true);
      try {
        const { data: res } = await API_CALL.register({ email: data.email, password: data.password, passwordConfirm: data.passwordConfirm });
        if (res.message) setAlert({ state: "info", message: res.message });
        setLoading(false);

        return res;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        const msg = err.response.data.message.split(":")
        if (err.response.data.message.includes("E11000")) {
          setAlert({ state: "error", message: "User already exists" });
        } else {
          setAlert({ state: "error", message: msg[msg.length - 1] });
        }
        setLoading(false);
      }
    }

    return null;
  };

  const forgotpassword = async (data: Partial<Record<Name, string>>) => {
    if (!data.email) {
      setAlert({ state: "error", message: "Email cannot be empty" });
    } else {
      setLoading(true);
      try {
        const { data: res } = await API_CALL.forgotPassword({ email: data.email });
        if (res.message) setAlert({ state: "info", message: res.message });
        setLoading(false);

        return res;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        const msg = err.response.data.message.split(":")
        setAlert({ state: "error", message: msg[msg.length - 1] });
        setLoading(false);
      }
    }

    return null;
  };

  const resetpassword = async (data: Partial<Record<Name, string>>) => {
    const search = new URLSearchParams(window.location.search)
    const token = search.get("reset-token")

    if (!data.password) {
      setAlert({ state: "error", message: "Password cannot be empty" });
    } else if (!data.passwordConfirm) {
      setAlert({ state: "error", message: "Confirm Password cannot be empty" })
    } else {
      setLoading(true);
      try {
        const { data: res } = await API_CALL.resetPassword(String(token), { password: data.password, passwordConfirm: data.passwordConfirm });
        const isPermitted = res.data.user.role === "moderator" || res.data.user.role === "admin"
        if (res.data?.user.isVerified && isPermitted) {
          setloginStatus("loggedin");
          setUser(res.data.user);
        } else {
          setAlert({ state: "info", message: "Contact admin to grant you the access" });
          await logout()
        }
        setLoading(false);

        return res;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        const msg = err.response.data.message.split(":")
        setAlert({ state: "error", message: msg[msg.length - 1] });
        setLoading(false);
      }
    }

    return null;
  };

  const verifyemail = async (_data: Partial<Record<Name, string>>) => {
    const search = new URLSearchParams(window.location.search)
    const token = search.get("verify-token")
    setLoading(true);
    try {
      const { data: res } = await API_CALL.verifyEmail(String(token));
      const isPermitted = res.data.user.role === "moderator" || res.data.user.role === "admin"
      if (res.data?.user.isVerified && isPermitted) {
        setloginStatus("loggedin");
        setUser(res.data.user);
      } else {
        setAlert({ state: "info", message: "Email Verified. Contact admin to grant you the access" });
        await logout()
      }
      setLoading(false);

      return res;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const msg = err.response.data.message.split(":")
      setAlert({ state: "error", message: msg[msg.length - 1] });
      setLoading(false);
    }

    return null;
  };

  async function logout() {
    try {
      const res = await API_CALL.logout();
      if (res.data.status === "success") {
        removeUser();
        setloginStatus("loggedout");
      }

      return null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return err.response;
    }
  }

  const navigate = (page: Page) => setPage(page)

  const functions: Record<Partial<Page>, onSubmit> = { login, forgotpassword, register, resetpassword, verifyemail }
  const currentFunction = functions[page]

  return (
    <Box
      bgcolor={"rgba(72, 128, 255, 1)"}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
      component="div"
    >
      <Paper
        variant="outlined"
        sx={{
          pt: "90px",
          width: "628px",
          borderRadius: "24px",
          overflow: "hidden",
        }}
      >
        <Box sx={{ padding: "0 56px 0 56px", }}>
          <Box>
            <Typography variant="h1" sx={{ textAlign: "center", mb: 2 }}>
              {currentPage.title}
            </Typography>
            <Typography sx={{ mb: isVerifyToken && page === "verifyemail" ? 0 : 8, textAlign: "center" }}>
              {currentPage.text}
            </Typography>
          </Box>

          <AuthForm
            page={page}
            alert={alert}
            btn={{
              default: currentPage.buttonText,
              loading: currentPage.loadingButtonText,
            }}
            clearAlert={clearAlert}
            loading={loading}
            onSubmit={currentFunction}
            fields={currentPage.inputs ?? []}
          />

          {currentPage.forgot && (
            <Box component="a" href="#" onClick={() => navigate("forgotpassword")} display="block" textAlign="center" mt={3} sx={{ textDecoration: "none" }}>Forgot Password?</Box>
          )}
        </Box>

        {currentPage.register && (
          <Box component="a" href="#" onClick={() => navigate("register")} display="block" textAlign="center" mt={4} color="#333" py="15px" bgcolor="#dfdfdf" sx={{ textDecoration: "none" }}>Register</Box>
        )}

        {currentPage.login && (
          <Box component="a" href="#" onClick={() => navigate("login")} display="block" textAlign="center" mt={4} color="#333" py="15px" bgcolor="#dfdfdf" sx={{ textDecoration: "none" }}>Login</Box>
        )}
      </Paper>
    </Box>
  );
}

export default Authentication;
