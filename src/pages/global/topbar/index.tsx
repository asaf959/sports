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

interface Props {
  className: string;
}

function Header({ className }: Props) {
  const { setSidebar, title } = useStore();

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
              columnGap: "150px",
            }}
          >
            <img src={logoSvg} alt="Logo" />
            <Box sx={{ fontSize: "28px", fontWeight: 600 }}>{title}</Box>
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
