import {
  Avatar,
  Box,
  // IconButton,
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
import namePic from "../../assets/img/profileImg.png";
import { useNavigate } from "react-router-dom";
import EditIcon from "../../assets/svg/edit.svg";
import deleteIcon from "../../assets/svg/delete.svg";

import IconButton from "../../components/iconButton";
import { editUserPath } from "../../router/path";

function Users() {
  const navigate = useNavigate();

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

  const handleEditUser = () => {
    navigate(editUserPath);
  };
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
      field: "name",
      headerName: "Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: styles.headerCell,
      cellClassName: styles.tableCell,
      renderCell: (detail) => (
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                sx={
                  detail.row.gender === "male"
                    ? { backgroundColor: "rgba(68, 139, 255,0.6)" }
                    : { backgroundColor: "rgba(211, 47, 47, 0.4)" }
                }
                src={namePic}
              >
                {/* {capitalize(detail.row.name).slice(0, 2)} */}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              secondary={"Thomas Shelby"}
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
      field: "league",
      headerName: "Username",
      flex: 1,
      sortable: false,
      headerClassName: styles.headerCell,
      cellClassName: styles.tableCell,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "country",
      headerName: "Password",
      flex: 1,
      sortable: false,
      headerClassName: styles.headerCell,
      cellClassName: styles.tableCell,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      align: "center",
      headerAlign: "center",
      width: 150,
      renderCell: () => (
        <Box display="flex" columnGap={"6px"}>
          <IconButton onClick={handleEditUser}>
            <Avatar
              src={EditIcon}
              alt="edit Icon"
              sx={{ height: "20px", width: "20px", borderRadius: 0 }}
            />
          </IconButton>
          <IconButton>
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

  const rows = [
    { id: 1, teams: "Real Madrid", league: "League 1", country: "Country A" },
    { id: 2, teams: "FC Barcelona", league: "League 2", country: "Country B" },
    { id: 3, teams: "Ud Las Palmas", league: "League 3", country: "Country C" },
    { id: 4, teams: "Osasuna FC", league: "League 4", country: "Country D" },
    { id: 5, teams: "FC Girona ", league: "League 5", country: "Country E" },
    { id: 6, teams: "Rayo Valecano", league: "League 6", country: "Country F" },
    { id: 7, teams: "Real Betis", league: "League 7", country: "Country G" },
    {
      id: 8,
      teams: "Athletico Madrid",
      league: "League 8",
      country: "Country H",
    },
    { id: 9, teams: "Real Sociedad", league: "League 9", country: "Country I" },
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
        rows={rows}
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
        }}
        pageSizeOptions={[5, 10]}
        className={styles.dataGrid}
        disableColumnFilter
        checkboxSelection
        disableColumnMenu
        disableRowSelectionOnClick
      />
    </Box>
  );
}

export default Users;
