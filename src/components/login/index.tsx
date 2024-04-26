import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Paper,
  Typography,
  Alert,
  AlertProps,
  styled,
  AlertColor
} from "@mui/material";
import Input from "../input";
import { Button } from "../button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { setUser } from "../../utils/session";
import API_CALL from "../../services";
import { useLoggedInUpdate } from "../../loggedInContext";
const StyledAlert = styled((props: AlertProps) => {
  const { ...other } = props;

  return <Alert {...other} />;
})(
  ({ theme, severity }) => `
    margin-top: ${theme.typography.pxToRem(32)};
    padding: 0;
    background: transparent;

    .MuiAlert-message {
      font-size: ${theme.typography.pxToRem((theme.typography.subtitle1.fontSize as number) || 0)};
      color: ${theme.palette[severity as AlertColor].main};
    }
  `
);

function Authentication() {
  const [password, setPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  type Error = {
    state?: null | AlertColor;
    message?: string;
  };
  const [alert, setAlert] = useState<Error>({ state: null, message: "" });

  const clearAlert = () => {
    setAlert(prev => ({ state: prev === null ? undefined : null }));
  };

  const setloginStatus = useLoggedInUpdate();

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string
    };

    if (!data.email) {
      setAlert({ state: "error", message: "Email cannot be empty" });
    } else if (!data.password) {
      setAlert({ state: "error", message: "Password cannot be empty" });
    } else {
      setLoading(true);
      try {
        const { data: res } = await API_CALL.login({ email: data.email, password: data.password });
        if (res.message) setAlert({ state: "info", message: res.message });
        if (res.data?.user.isVerified) {
          setloginStatus("loggedin");
          setUser(res.data.user);
        }
        setLoading(false);

        return res;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setAlert({ state: "error", message: err.response.data.message });
        setLoading(false);
      }
    }

    return null;
  };

  const handlePasswordVisible = () => {
    setPassword(!password);
  };
  // const navigate = useNavigate();
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
          padding: "90px 56px",
          width: "628px",
          borderRadius: "24px",
        }}
      >
        <form method="post" onSubmit={login} onChange={clearAlert}>
        <Box>
          <Typography variant="h1" sx={{ textAlign: "center", mb: 2 }}>
            Login to Account
          </Typography>
          <Typography sx={{ mb: 8, textAlign: "center" }}>
            Please enter your username and password to continue
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" rowGap={6} mb={3}>
          <Input name="email" id="email" label="Email" autoFocus={false} autoComplete="none" />
          <Input
            name="password"
            type={password ? "text" : "password"}
            id="password"
            label="Password"
            variant="outlined"
            autoFocus={false}
            size="small"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handlePasswordVisible}
                    edge="end"
                  >
                    {password ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box mb={7}>
          <FormControlLabel
            sx={{ color: "rgba(32, 34, 36, 1)", fontSize: "1px" }}
            control={<Checkbox />}
            label="Remember Password"
          />
        </Box>
        <Box textAlign="center">
          <Button
            variant="contained"
            fullWidth
            sx={{ maxWidth: "418px" }}
            type="submit" disabled={loading}
          >
            {loading ? "Logging in" : "Login"}
            {/* Sign In */}
          </Button>
          {!loading && alert?.state && (
                  <StyledAlert variant="standard" severity={alert.state}>
                    {alert.message}
                  </StyledAlert>
                )}
        </Box>
        </form>
      </Paper>
    </Box>
  );
}

export default Authentication;
