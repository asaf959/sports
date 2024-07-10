import {
  Box,
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

export type Error = {
  state?: null | AlertColor;
  message?: string;
};

export const StyledAlert = styled((props: AlertProps) => {
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

type Type = "email" | "password"
export type Name = Type | "passwordConfirm"

type AuthResponseData = Partial<Record<Name, string>>
export type onSubmit =  (data: AuthResponseData) => void

export interface Field {
  type: Type,
  name: Name,
  label: string,
}

interface AuthFormProps {
  page: string,
  alert: Error,
  fields: Field[],
  loading: boolean,
  btn: {
    default: string,
    loading: string,
  },
  clearAlert: () => void,
  onSubmit: onSubmit
}

function AuthForm({ page, alert, fields, loading, btn, clearAlert, onSubmit }: AuthFormProps) {
  const [visibility, setVisibility] = useState<Record<Name, boolean>>({
    email: false,
    password: false,
    passwordConfirm: false
  });

  const handlePasswordVisible = (name: Name) => {
    setVisibility(prev => ({ ...prev, [name]: !prev[name] }))
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const data: AuthResponseData = {}
    fields.forEach((field => {
      data[field.name] = formData.get(field.name) as string
    }))

    onSubmit(data)
  }

  return (
    <Box component="form" method="post" onSubmit={submit} onChange={clearAlert}>
      <Box display="flex" flexDirection="column" rowGap={3} mb={6}>
        {fields.map((val, idx) => (
          <Input
            key={page + idx}
            type={(val.name === "email" && val.name) || visibility[val.name] ? "text" : "password"}
            name={val.name}
            label={val.label}
            id={val.name}
            InputProps={val.name === "email" ? {} : {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle Password Visibility"
                    onClick={() => handlePasswordVisible(val.name)}
                    edge="end"
                  >
                    {visibility[val.name] ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        ))}
      </Box>
      <Box textAlign="center">
        <Button variant="contained" fullWidth sx={{ maxWidth: "418px" }} type="submit" disabled={loading}>
          {loading ? btn.loading : btn.default}
        </Button>
        {!loading && alert?.state && (
          <StyledAlert variant="standard" severity={alert.state}>
            {alert.message}
          </StyledAlert>
        )}
      </Box>
    </Box>
  );
}

export default AuthForm;
