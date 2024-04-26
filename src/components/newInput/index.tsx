import { useState } from "react";
import {
  Box,
  Input,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type Option = {
  value: string;
  label: string;
}

interface Props {
  label: string;
  type?: "text" | "password";
  value?: string;
  name?: string;
  selectOptions?: Option[];
  placeholder?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
}

function AppInput({ label, name, type, placeholder, value, onChange, selectOptions }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // console.log(value, selectOptions);

  const renderInput = () => {
    if (selectOptions) {
      return (
        <Select
          name={name}
          sx={{
            width: "100%",
            height: "52px",
            backgroundColor: "#F5F6FA",
            border: "0.4px solid #D5D5D5",
            fontSize: "14px",
            fontWeight: 400,
            borderRadius: "4px",
            marginTop: "11px",
            outline: "none",
          }}
          placeholder="Select a Sport"
          value={value}
          defaultValue="54545"
          onChange={(e) => {
            if (e.target.value && onChange) onChange(e as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
          }}
        >
          <MenuItem value="">Select an option</MenuItem>

          {selectOptions.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      );
    } else {
      return (
        <>
        <Input
          name={name}
          type={showPassword ? "text" : type}
          endAdornment={
            type === "password" && (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }
          sx={{
            width: "100%",
            height: "52px",
            backgroundColor: "#F5F6FA",
            border: "1px solid #D5D5D5",
            fontSize: "14px",
            fontWeight: 400,
            borderRadius: "4px",
            marginTop: "11px",
            paddingLeft: "16px",
            paddingRight: "16px",
            outline: "none",
          }}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        </>

      );
    }
  };

  return (
    <Box>
      <label style={{ color: "#606060", fontSize: "14px", fontWeight: 500 }}>
        {label}
      </label>
      <Box>
        {renderInput()}</Box>
    </Box>
  );
}

export default AppInput;
