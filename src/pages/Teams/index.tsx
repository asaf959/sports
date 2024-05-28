import { Box, InputAdornment, styled } from "@mui/material";
import PageHeader from "../../components/header";
import styles from "./style.module.scss";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Input from "../../components/input";
import SearchIcon from "@mui/icons-material/Search";
import API_CALL from "../../services";
import React from "react";

type SportsType = {
  leagues: {
    name: string
    teams: {
      team: {
        id: string,
        displayName: string
        league: string
        location: string
      }
    }[]
  }[]
}

type SportStateType = Omit<SportsType["leagues"][0]["teams"][0]["team"], "displayName" | "location"> & { teams: string, city: string }

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
  const [data, setData] = React.useState<SportStateType[]>([])
  const getMatchesForSport = async () => {
    try {
      const data = JSON.parse(sessionStorage.getItem("sport") || "{}");
      if (!data.sport || !data.league) {
        console.error("Sport or league not found in sessionStorage");
        return;
      }
      const response = await API_CALL.getTeams({ sport: data.sport, league: data.league });
      console.log(response)
      // Assuming response.data.data.sports is the array of sports
      const sports = response.data.data.sports as SportsType[];
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
  ];

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
          height: data.length === 0 ? "200px" : "auto",
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

export default Teams;
