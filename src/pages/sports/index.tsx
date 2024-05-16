import { useState } from "react";
import { Box } from "@mui/material";
import PageHeader from "../../components/header";
import SportTab from "../../components/sportTab";
import { Button } from "../../components/button";
import { useNavigate } from "react-router-dom";
import { dashboardPath } from "../../router/path";
import useStore from "../../store";

function Sports() {
  const { setTitle } = useStore();
  const navigate = useNavigate();
  const [selectedLeague, setSelectedLeague] = useState<string>("");

const handleSportSelection = (sport: string, league: string) => {
  setSelectedLeague(league);
  setTitle(sport);
  // Store the sport and league in sessionStorage
  sessionStorage.setItem("sport", JSON.stringify({ sport, league }));
 };


  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100%",
        boxSizing: "border-box",
        padding: "80px 182px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PageHeader title="Select a Sport" />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "40px",
          mt: "40px",
        }}
      >
        <SportTab
          sport="NBA"
          league="nba"
          selected={selectedLeague === "nba"}
          onClick={() => handleSportSelection("basketball", "nba")}
          />
        <SportTab
          sport="MLB"
          league="mlb"
          selected={selectedLeague === "mlb"}
          onClick={() => handleSportSelection("baseball", "mlb")}
          />
          <SportTab
          sport="NHL"
          league="nhl"
          selected={selectedLeague === "nhl"}
          onClick={() => handleSportSelection("hockey", "nhl")}
          />
          <SportTab
          sport="NFL"
          league="nfl"
          selected={selectedLeague === "nfl"}
          onClick={() => handleSportSelection("football", "nfl")}
          />
          <SportTab
          sport="CFL"
          league="cfl"
          selected={selectedLeague === "cfl"}
          onClick={() => handleSportSelection("football", "cfl")}
          />
          <SportTab
          sport="Tennis"
          league="all"
          selected={selectedLeague === "tournament"}
          onClick={() => handleSportSelection("tennis", "tournament")}
          />
          <SportTab
          sport="F1"
          league="f1"
          selected={selectedLeague === "f1"}
          onClick={() => handleSportSelection("racing", "f1")}
          />
          <SportTab
          sport="MMA"
          league="ufc"
          selected={selectedLeague === "ufc"}
          onClick={() => handleSportSelection("mma", "ufc")}
          />
      </Box>
      <Box
        sx={{
          textAlign: "center",
          marginTop: "auto",
        }}
      >
        <Button
          variant="contained"
          fullWidth
          sx={{ maxWidth: "300px" }}
          onClick={() => {
            navigate(dashboardPath);
          }}
        >
          Go to Dashboard
        </Button>
      </Box>
    </Box>
  );
}

export default Sports;
