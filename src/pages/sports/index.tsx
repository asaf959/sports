import { useState } from "react";
import { Box } from "@mui/material";
import PageHeader from "../../components/header";
import SportTab from "../../components/sportTab";
import { Button } from "../../components/button";
import { useNavigate } from "react-router-dom";
import { dashboardPath } from "../../router/path";
import useStore from "../../store";
import API_CALL from "../../services";
import { removeUser } from "../../utils/session";
import { useLoggedInUpdate } from "../../loggedInContext";
import { capitalize } from "lodash";

function Sports() {
  const { setTitle } = useStore();
  const navigate = useNavigate();
  const [selectedLeague, setSelectedLeague] = useState<string>("");
  const setloginStatus = useLoggedInUpdate();

  const handleSportSelection = (sport: string, league: string) => {
    setSelectedLeague(league);
    setTitle(capitalize(sport));
    // Store the sport and league in sessionStorage
    sessionStorage.setItem("sport", JSON.stringify({ sport, league }));
  };

  async function logout() {
    try {
      const res = await API_CALL.logout();
      if (res.data.status === "success") {
        removeUser();
        setloginStatus("loggedout");
        navigate("/");
      }

      return null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return err.response;
    }
  }


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
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={logout}
        sx={{
          position: "absolute",
          top: 30,
          right: 30,
        }}
      >
        Logout
      </Button>
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
          selected={selectedLeague === "nba"}
          onClick={() => handleSportSelection("basketball", "nba")}
        />
        <SportTab
          sport="MLB"
          selected={selectedLeague === "mlb"}
          onClick={() => handleSportSelection("baseball", "mlb")}
        />
        <SportTab
          sport="NHL"
          selected={selectedLeague === "nhl"}
          onClick={() => handleSportSelection("hockey", "nhl")}
        />
        <SportTab
          sport="NFL"
          selected={selectedLeague === "nfl"}
          onClick={() => handleSportSelection("football", "nfl")}
        />
        <SportTab
          sport="CFL"
          selected={selectedLeague === "cfl"}
          onClick={() => handleSportSelection("football", "cfl")}
        />
        <SportTab
          sport="Tennis"
          selected={selectedLeague === "tournament"}
          onClick={() => handleSportSelection("tennis", "tournament")}
        />
        <SportTab
          sport="F1"
          selected={selectedLeague === "f1"}
          onClick={() => handleSportSelection("racing", "f1")}
        />
        <SportTab
          sport="UFC"
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
