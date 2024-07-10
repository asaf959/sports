import {
  Avatar,
  Box,
  Chip,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
} from "@mui/material";
import PageHeader from "../../components/header";
import styles from "./style.module.scss";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Input from "../../components/input";
import SearchIcon from "@mui/icons-material/Search";
import deleteIcon from "../../assets/svg/delete.svg";

import IconButton from "../../components/iconButton";
import { useEffect, useState } from "react";
import API_CALL from "../../services";
import { Button } from "../../components/button";
import showToast from "../../utils/notify";
import { getCurrentUser } from "../../utils/session";

export enum Role {
  ADMIN = "admin",
  MODERATOR = "moderator",
  USER = "user"
}

type User = {
  _id: string,
  email: string,
  isVerified: boolean,
  role: string,
  createdAt: string,
  updatedAt: string,
  verifiedAt: string,
  id: string,
}

function Users() {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    try {
      const { data: res } = await API_CALL.getUsers()
      setUsers(res.data.users);
    } catch (err: any) {
      console.log(err.response.data.message);
    }
  }

  const currentUser = getCurrentUser()

  useEffect(() => {
    void getUsers()
  }, []);

  const Table = styled(DataGrid)`
    & .MuiDataGrid-root {
      background-color: #fcfdfd !important;
    }
    & .MuiDataGrid-columnHeaderTitle {
      font-weight: 600 !important;
      font-size: 14px !important;
    }
    & .MuiDataGrid-cellContent {
      font-size: 14px !important;
    }
    // & .MuiDataGrid-main{
    //   padding:21px !important;

    // }
  `;

  const mappedUsers = users.filter(val => val._id !== currentUser._id).map((val, idx) => ({ ...val, id: idx + 1 }))

  const updateRole = async (id: string, role: Role) => {
    try {
      await API_CALL.updateRole(id, role)
      showToast("success", "Role Updated")
      void getUsers();
    } catch (err: any) {
      console.log(err.response.data.message);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await API_CALL.deleteUser(id)
      showToast("success", "User deleted")
      void getUsers();
    } catch (err) {

    }
  }

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "S.no",
      width: 200,
      sortable: false,
      headerClassName: styles.headerCell,
      cellClassName: styles.tableCell,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: styles.headerCell,
      cellClassName: styles.tableCell,
      renderCell: (detail) => (
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText
              secondary={detail.row.email}
              secondaryTypographyProps={{
                variant: "subtitle1",
                color: "text.primary",
              }}
            />
          </ListItem>
        </List>
      ),
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      sortable: false,
      headerClassName: styles.headerCell,
      cellClassName: styles.tableCell,
      headerAlign: "center",
      align: "center",
      renderCell: (detail) => (
        <Chip
          color={detail.row.role === "user" ? "warning" : "primary"}
          sx={{ fontSize: 12, fontWeight: 500 }}
          label={detail.row.role.toUpperCase()}
        />
      )
    },
    {
      field: "isVerified",
      headerName: "Verification",
      flex: 1,
      sortable: false,
      headerClassName: styles.headerCell,
      cellClassName: styles.tableCell,
      headerAlign: "center",
      align: "center",
      renderCell: (detail) => (
        <Chip
          color={detail.row.isVerified ? "success" : "error"}
          sx={{ fontSize: 12, fontWeight: 500 }}
          label={detail.row.isVerified ? "Verified" : "Unverified"}
        />
      )
    },
    {
      field: "action",
      headerName: "Actions",
      align: "center",
      headerAlign: "center",
      width: 270,
      renderCell: (detail) => (
        <Box display="flex" alignItems="center" justifyContent="flex-end" height="100%" columnGap={"6px"}>
          {console.log(detail.row.role) as any as string}
          <Button
            title={detail.row.role === "user" ? "Make Moderator" : "Make User"}
            color={detail.row.role === "user" ? "primary" : "warning"}
            variant="contained"
            size="small"
            onClick={() => updateRole(detail.row._id, detail.row.role === Role.MODERATOR ? Role.USER : Role.MODERATOR)}
          >
            {detail.row.role === "user" ? "Make Moderator" : "Make User"}
          </Button>
          <IconButton onClick={() => deleteUser(detail.row._id)}>
            <Avatar
              src={deleteIcon}
              alt="edit Icon"
              sx={{ height: "20px", width: "20px", borderRadius: 0 }}
            />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box component="div">
      <PageHeader title="Users" />
      <Box
        sx={{
          width: "100%",
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Input
          sx={{
            "& .MuiInputBase-root": {
              backgroundColor: "#ffff",
              borderRadius: "20px",
              width: "400px",
            },
          }}
          fullWidth
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Table
        rows={mappedUsers}
        columns={columns}
        columnHeaderHeight={54}
        rowHeight={64}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 9 },
          },
        }}
        sx={{
          backgroundColor: "#ffff",
          height: mappedUsers.length === 0 ? "200px" : "auto",
        }}
        pageSizeOptions={[5, 10]}
        className={styles.dataGrid}
        disableColumnFilter
        disableColumnMenu
        localeText={{
          noRowsLabel: "No Data available",
        }}
      />
    </Box>
  );
}

export default Users;
