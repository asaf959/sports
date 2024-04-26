import { Box, Typography, useTheme } from "@mui/material";

import { tokens } from "../../theme";

interface Props {
  status: number | undefined;
  message: string;
}

export default function ErrorTemplate({ status, message }: Props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
        pb: "10%"
      }}
    >
      <Typography variant="h1" style={{ fontSize: 80, color: colors.blueAccent[100], fontWeight: 600, marginBottom: 20 }}>
        {status}
      </Typography>
      <Typography variant="h6">{message}</Typography>
    </Box>
  );
}
