import { TextField, styled } from "@mui/material";

const Input = styled(TextField)`
  ${({ theme }) => `
  .MuiInputBase-root:has(> input:-webkit-autofill) {
    background-color: #e8f0fe;;
  }
    .MuiInputBase-input {
      padding-block: ${theme.typography.pxToRem(12.5)};
    }

    .MuiFormLabel-root {
      transform: translate(14px, ${theme.typography.pxToRem(13)}) scale(1);

      &.Mui-focused, &.MuiFormLabel-filled, &.MuiInputLabel-shrink  {
        transform: translate(14px, ${theme.typography.pxToRem(-9)}) scale(0.75);
      }
      & .MuiOutlinedInput-root {
        padding-block: ${theme.typography.pxToRem(4)};
        padding:0 !important;
      }
    }
  `}
`;

export default Input;
