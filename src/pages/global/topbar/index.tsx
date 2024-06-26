import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";

// import logo from "../../../assets/img/logoApp.png";
import logoSvg from "../../../assets/svg/logoApp.svg";
import useStore from "../../../store";

import ProfileMenu from "./profileMenu";
import { getSportFromSession } from "../../../utils/utils";

interface Props {
  className: string;
}

function Header({ className }: Props) {
  const { setSidebar, title } = useStore();

  const sport = getSportFromSession();

  return (
    <Paper variant="outlined" className={className} sx={{ boxShadow: "none" }}>
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <IconButton
            color="inherit"
            onClick={() => setSidebar(true)}
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center"
            }}
          >
            <Box mr={"100px"}>
              <img src={logoSvg} alt="Logo" />
            </Box>
            <img src={`/leagues/${sport.league.toLowerCase()}.png`} alt={sport.league} />
            <Box sx={{ ml: "20px", fontSize: "28px", fontWeight: 600 }}>{title}</Box>
          </Box>

          <Box display="flex" alignItems="center">
            <ProfileMenu />
          </Box>
        </Toolbar>
      </Container>
    </Paper>
  );
}

export default Header;
