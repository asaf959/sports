import { Box, InputAdornment, styled } from "@mui/material";
import PageHeader from "../../components/header";
import styles from "./style.module.scss";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Input from "../../components/input";
import SearchIcon from "@mui/icons-material/Search";
import API_CALL from "../../services";
import React from "react";

function Teams() {
  const Table = styled(DataGrid)`
    & .MuiDataGrid-root {
      background-color: #fcfdfd !important;
    }
    & .MuiDataGrid-columnHeaderTitle {
      font-weight: 600 !important;
      font-size: 14px !important;
    }
    & .MuiDataGrid-cellContent {
      font-size:14px !important;
    }
  `;
  const [ data, setData ]= React.useState({})
  // const getMatchesForSport = async () => {
  //   try {
  //      const data = JSON.parse(sessionStorage.getItem("sport") || "{}");
  //      console.log(data)
  //      if (!data.sport || !data.league) {
  //        console.error("Sport or league not found in sessionStorage");
  //        return;
  //      }
  //      const response = await API_CALL.getTeams({ sport: data.sport, league: data.league });
  //      setData(response.data.data.sports);
  //   } catch (error) {
  //      console.error("Error fetching matches for sport:", error);
  //   }
  //  };
  const getMatchesForSport = async () => {
    try {
       const data = JSON.parse(sessionStorage.getItem("sport") || "{}");
       if (!data.sport || !data.league) {
         console.error("Sport or league not found in sessionStorage");
         return;
       }
       const response = await API_CALL.getTeams({ sport: data.sport, league: data.league });
       // Assuming response.data.data.sports is the array of sports
       const sports = response.data.data.sports;
       const flattenedData = sports.flatMap(sport =>
         sport.leagues.flatMap(league =>
           league.teams.map(team => ({
             id: team.team.id,
             teams: team.team.displayName,
             league: league.name,
             city: team.team.location,
           }))
         )
       );
   
       setData(flattenedData);
    } catch (error) {
       console.error("Error fetching matches for sport:", error);
    }
   };
   
  React.useEffect(() => {
    void getMatchesForSport()
  }, []);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 200,
      sortable: false,
      headerClassName: styles.headerCell,
      cellClassName: styles.tableCell,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "teams",
      headerName: "TEAMS",
      flex: 1,
      sortable: false,
      headerClassName: styles.headerCell,
      cellClassName: styles.tableCell,
    },
    {
      field: "league",
      headerName: "LEAGUE",
      flex: 1,
      sortable: false,
      headerClassName: styles.headerCell,
      cellClassName: styles.tableCell,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
      sortable: false,
      headerClassName: styles.headerCell,
      cellClassName: styles.tableCell,
    },
    {
      field: "fullName",
      headerName: "LOREM IPSUM",

      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        `Lorem Ipsum ${params.row.id}`, // Value getter based on the ID
      headerClassName: styles.headerClass,
      cellClassName: styles.tableCell,
    },
  ];

  // const rows = [
  //   { id: 1, teams: "Real Madrid", league: "League 1", country: "Country A" },
  //   { id: 2, teams: "FC Barcelona", league: "League 2", country: "Country B" },
  //   { id: 3, teams: "Ud Las Palmas", league: "League 3", country: "Country C" },
  //   { id: 4, teams: "Osasuna FC", league: "League 4", country: "Country D" },
  //   { id: 5, teams: "FC Girona ", league: "League 5", country: "Country E" },
  //   { id: 6, teams: "Rayo Valecano", league: "League 6", country: "Country F" },
  //   { id: 7, teams: "Real Betis", league: "League 7", country: "Country G" },
  //   {
  //     id: 8,
  //     teams: "Athletico Madrid",
  //     league: "League 8",
  //     country: "Country H",
  //   },
  //   { id: 9, teams: "Real Sociedad", league: "League 9", country: "Country I" },
  // ];
  return (
    <Box component="div">
      <PageHeader title="Teams" />
      <Box sx={{ width: "400px", mb: 2 }}>
        <Input
          sx={{
            "& .MuiInputBase-root": {
              backgroundColor: "#ffff",
              borderRadius: "20px",
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
        rows={data}
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
        disableColumnMenu
      />
    </Box>
  );
}

export default Teams;
