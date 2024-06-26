import { Box } from "@mui/material";

interface IconButtonProps {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const IconButton = ({ children, onClick }: IconButtonProps) => {
  return (
    <Box
      height={47}
      width={47}
      borderRadius={1}
      border="0.6px solid #D5D5D5"
      bgcolor="#FAFBFD"
      display="flex"
      justifyContent="center"
      alignItems="center"
      component="button"
      onClick={onClick}
      sx={{
        cursor: "pointer", // Set cursor to pointer
      }}
    >
      {children}
    </Box>
  );
};

export default IconButton;
