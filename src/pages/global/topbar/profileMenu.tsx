import Logout from "@mui/icons-material/Logout";
import { ListItemButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import { useLoggedInUpdate } from "../../../loggedInContext";
import { manageAccountPath } from "../../../router/path";
import API_CALL from "../../../services";
import { getCurrentUser, removeUser } from "../../../utils/session";
import { capitalize } from "lodash";

function ProfileMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const setloginStatus = useLoggedInUpdate();

  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
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

  const user = getCurrentUser()

  console.log(user.email);

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="My Account">
          <ListItemButton dir="rtl" sx={{ py: 0 }} onClick={handleClick}>
            <ListItemAvatar sx={{ ml: 2 }}>
              <Avatar
                sx={{
                  height: 50,
                  width: 50,
                  // fontSize: 32,
                  bgcolor: "rgba(72, 128, 255, 0.15)",
                  color: "#000",
                  // fontWeight: 600,
                }}
              />
            </ListItemAvatar>
            <ListItemText primary={user.email} secondary={capitalize(user.role)} />
          </ListItemButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        // Apply styling directly to the PaperProps and BackdropProps props
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 32,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            navigate(manageAccountPath);
          }}
        >
          <ListItemIcon>
            <ManageAccountsIcon fontSize="small" />
          </ListItemIcon>
          Manage Account
        </MenuItem>
        <MenuItem
          onClick={logout}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default ProfileMenu;
