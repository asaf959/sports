import { Box, Paper, Typography } from "@mui/material";

interface Props {
  sport: string;
  selected: boolean;
  onClick: () => void;
}

function SportTab({ sport, selected, onClick }: Props) {

  return (
    <Paper
      variant="outlined"
      sx={{
        height: "148px",
        width: "148px",
        borderRadius: "12px",
        p: 4,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: 3,
        alignItems: "center",
        transition: "background-color 0.3s, color 0.3s", // Add transition for smooth effect
        backgroundColor: selected ? "rgba(72, 128, 255, 1)" : "transparent",
        color: selected ? "#fff" : "inherit",
        "&:hover": {
          backgroundColor: selected
            ? "rgba(72, 128, 255, 1)"
            : "rgba(72, 128, 255, 0.7)",
          color: "#fff",
          cursor: "pointer",
        },
      }}
      onClick={onClick}
    >
      <Box sx={{textAlign: "center"}}><img src={`/leagues/${sport.toLowerCase()}.png`} alt={sport} /></Box>
      <Typography sx={{ mt: "auto",fontWeight: 500, fontSize: 18 }}>{sport}</Typography>
    </Paper>
  );
}

export default SportTab;
