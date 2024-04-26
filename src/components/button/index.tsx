import MuiButton, { ButtonProps } from "@mui/material/Button";
import MuiInputLabel, { InputLabelProps } from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";

// const Button = styled(MuiButton)`
//   ${({ theme }) => `
//     padding: ${theme.typography.pxToRem(12)} ${theme.typography.pxToRem(32)};
//   `}
// `;

export const Button = styled((props: ButtonProps) => {
  const { ...other } = props;

  return <MuiButton {...other} />;
})(
  ({ theme }) => `
    text-transform:none;
    &.MuiButton-sizeMedium {
      padding: ${theme.typography.pxToRem(12)} ${theme.typography.pxToRem(32)};
      text-transform: none;
      white-space: nowrap;
      font-weight:600
    }
    &.MuiButton-root {
      box-shadow: none !important;
      text-transform: none;
      white-space: nowrap;
    }
  
    &.MuiButton-sizeSmall {
      padding: ${theme.typography.pxToRem(8)} ${theme.typography.pxToRem(16)};
      text-transform: none;
      white-space: nowrap;
    }
   `
);

export const LabelButton = styled((props: InputLabelProps) => {
  const { ...other } = props;

  return <MuiInputLabel {...other} />;
})(
  ({ theme }) => `
  text-transform: none;
  white-space: nowrap;
  font-size:14px;
  pointer-events: unset;  
  display: inline-block;
  cursor: pointer;
  background-color: ${theme.palette.primary.main};
  color: ${theme.palette.primary.contrastText};
  padding: ${theme.typography.pxToRem(12)} ${theme.typography.pxToRem(24)};

  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s ease;
  overflow: visible;
  border-radius:8px;
  &.MuiInputLabel-sizeSmall {
    margin: 0;
    -webkit-transform: none; /* Remove this line */
    height: 34px;
    padding: ${theme.typography.pxToRem(7)};
    font-size:14px;
}

  &:hover {
    background-color: ${theme.palette.primary.dark};
  }
`
);
