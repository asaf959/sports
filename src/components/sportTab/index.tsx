import { Paper, Typography } from "@mui/material";

interface Props {
  sport: string;
  selected: boolean;
  league: string;
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
        display: "flex",
        justifyContent: "center",
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
      <Typography sx={{ fontWeight: 500, fontSize: 18 }}>{sport}</Typography>
    </Paper>
  );
}

export default SportTab;
