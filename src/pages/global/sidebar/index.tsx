import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { styled } from "@mui/material";

import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import JoinFullOutlinedIcon from "@mui/icons-material/JoinFullOutlined";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
// import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LinkIcon from '@mui/icons-material/Link';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

import { useLocation, useNavigate } from "react-router-dom";

import {
  dashboardPath,
  teamsPath,
  matchPath,
  combinationPath,
  channelPath,
  alternateLinksPath,
  usersPath,
  // sportsPath,
} from "../../../router/path";
import {
  alternateLinkTitle,
  channelsTitle,
  combinationTitle,
  dashboardTitle,
  matchesTitle,
  teamsTitle,
  usersTitle,
} from "../../../router/title";
import useStore from "../../../store";
import ConnectedTvIcon from '@mui/icons-material/ConnectedTv';
import { removeTeamsOnSpecificRoutes } from "../../../router/PrivateRoutes";

const StyledListItemButton = styled(ListItemButton)`
  ${({ theme }) => `
  cursor: pointer;
  background-color: transparent !important;

  &, .MuiListItemIcon-root {
    transition: ${theme.transitions.create(["scale", "color"], {
  duration: theme.transitions.duration.standard,
})};
  }

  &::before, &::after {
    content: "";
    position: absolute;
    inset: 0 auto 0 0;
    width: var(--width);
    height: var(--width);
    margin: auto;
    translate: -50% 0;
    border-radius: 50%;
    scale: 0;
  }
  &::before {
    --width: 11px;
    background-color: #448BFF;
  }
  &::after {
    --width: 31px;
    background: radial-gradient(43.97% 43.97% at 50% 51.18%, rgba(68, 139, 255, 0.0001) 0%, rgba(68, 139, 255, 0.264719) 35.94%, rgba(68, 139, 255, 0.0001) 100%);
  }

  &:hover, &.Mui-selected {
    color: ${theme.palette.primary.main};

    .MuiListItemIcon-root {
      color: ${theme.palette.primary.main};
    }
  }

  &.Mui-selected {
    &::before,
    &::after {
      scale: 1;
    }x
  }
  `}
`;

interface Props {
  className: string;
}

interface ListItemInterface {
  name: string;
  icon: JSX.Element;
  url: string;
  authorized: boolean
}

const ListItems: ListItemInterface[] = [
  {
    name: dashboardTitle,
    icon: <HomeOutlinedIcon />,
    url: dashboardPath,
    authorized: false
  },
  {
    name: teamsTitle,
    icon: <Groups2OutlinedIcon />,
    url: teamsPath,
    authorized: false
  },
  {
    name: matchesTitle,
    icon: <CalendarMonthOutlinedIcon />,
    url: matchPath,
    authorized: false
  },
  {
    name: combinationTitle,
    icon: <JoinFullOutlinedIcon />,
    url: combinationPath,
    authorized: false
  },
  {
    name: channelsTitle,
    icon: <ConnectedTvIcon />,
    url: channelPath,
    authorized: false
  },
  {
    name: alternateLinkTitle,
    icon: <LinkIcon />,
    url: alternateLinksPath,
    authorized: false
  },
];

const secondary: ListItemInterface[] = [
  {
    name: usersTitle,
    icon: <PeopleAltOutlinedIcon />,
    url: usersPath,
    authorized: true
  },
  {
    name: "All Sports",
    icon: <KeyboardBackspaceOutlinedIcon />,
    url: "/",
    authorized: false
  },
];

export default function Sidebar({ className }: Props) {
  const { sidebar, setSidebar } = useStore();
  const location = useLocation();
  const navigate = useNavigate();

  const drawerWidth = 240;

  const drawer = (
    <>
      <List sx={{ mb: "auto" }}>
        {ListItems.filter(item => {
          if (item.name === teamsTitle)
            return !removeTeamsOnSpecificRoutes()
          return true
        }).map((item, idx) => (
          <ListItem key={idx} disablePadding>
            <StyledListItemButton
              onClick={(e) => {
                if (e.ctrlKey) window?.open(item.url, "_blank");
                else navigate(item.url, {});
              }}
              selected={location.pathname === item.url}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{ variant: "subtitle2" }}
              />
            </StyledListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        {secondary.map((item, idx) => (
          <ListItem disablePadding key={idx}>
            <StyledListItemButton
              onClick={(e) => {
                if (e.ctrlKey) window?.open(item.url, "_blank");
                else navigate(item.url, {});
              }}
              selected={location.pathname === item.url}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{ variant: "subtitle2" }}
              />
            </StyledListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Box
      className={className}
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={document.body}
        variant="temporary"
        open={sidebar}
        onClose={() => setSidebar(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block", height: "100%" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            position: "static",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
