import { Avatar, Box, Divider, Grid, InputAdornment, styled } from "@mui/material";
import PageHeader from "../../components/header";
import styles from "./style.module.scss";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Input from "../../components/input";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "../../components/button";
import Backdrop from "@mui/material/Backdrop";
import EditIcon from "../../assets/svg/edit.svg";
import TrashIcon from "../../assets/svg/trash.svg";

import IconButton from "../../components/iconButton";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import API_CALL from "../../services";
import DateObject from "react-date-object";
import AppInput from "../../components/newInput";
import AddIcon from "@mui/icons-material/Add";
import { getSportFromSession } from "../../utils/utils";
import notify from "../../utils/notify";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";


interface Link {
  label: string;
  name?: string;
  link?: string;
  ExternalLink?: string;
}

type ApiDataType = {
  league: {
    name: string;
    slug: string;
    events: {
      _id: string;
      date: Date;
      description?: string
      note?: string
      competitors: {
        displayName: string;
        logo: string;
        headshot: string
      }[];
      isLocal: boolean
      streamingLinks: {}[];
      externalLinks: {}[];
    }[];
  };
  logo: {
    href: string;
  };
};

type SportsType = {
  leagues: {
    name: string
    teams: {
      team: {
        id: string,
        displayName: string
        league: string
        location: string
        abbreviation: string
        alternateColor: string
        color: string
        isActive: boolean
        isAllStar: boolean
        name: string
        nickname: string
        slug: string
        links?: any
        logos?: any
      }
    }[]
  }[]
}

type SportStateType = Omit<SportsType["leagues"][0]["teams"][0]["team"], "displayName" | "location"> & { teams: string, city: string }

function Matches() {
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
  `;
  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState<ApiDataType>();
  const [open, setOpen] = React.useState(false);
  const [openMatch, setOpenMatch] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedItem, setSelectedItem] = React.useState<any>();
  type MatchData = {
    homeTeam: string
    awayTeam: string
    description?: string
    note?: string
    date: Date
  }
  const [matchData, setMatchData] = React.useState<MatchData>({
    homeTeam: "",
    awayTeam: "",
    date: new Date()
  });
  const handleEditClose = () => setEditModalOpen(false);

  const [links, setLinks] = React.useState<Link[]>([
    { label: "Link 1", name: undefined, link: undefined },
    { label: "Link 2", name: undefined, link: undefined },
  ]);
  const [externalLinks, setExternalLinks] = React.useState<Link[]>([
    { label: "External Link 1", name: undefined, ExternalLink: undefined },
  ]);

  const [teamData, setTeamData] = React.useState<SportStateType[]>([])

  const matchDate = dayjs(matchData.date);

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    setMatchData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleDateChange = (e: dayjs.Dayjs | null) => {
    if (e) {
      const date = new Date(`${e.month() + 1}-${e.date()}-${e.year()} ${e.hour()}:${e.minute()}`);
      setMatchData(prev => ({ ...prev, date: date }))
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditOpen = (data: any) => {
    setSelectedItem(data);
    setEditModalOpen(true);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setLinks(
      data.streamingLinks.map((val: any, idx: number) => ({
        label: `Link ${idx + 1}`,
        name: val.title,
        link: val.link,
      }))
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setExternalLinks(
      data.externalLinks.map((val: any, idx: number) => ({
        label: `External Link ${idx + 1}`,
        name: val.title,
        link: val.link,
      }))
    );
  };

  const handleAddLink = () => {
    const newLabel = `Link ${links.length + 1}`;
    setLinks((prevLinks) => [
      ...prevLinks,
      { label: newLabel, name: "", link: "" },
    ]);
  };

  const handleAddExternalLink = () => {
    const newLabel = `External Link ${externalLinks.length + 1}`;
    setExternalLinks((prevExternalLinks) => [
      ...prevExternalLinks,
      { label: newLabel, name: "", externalLink: "" },
    ]);
  };

  const [currentDateTime, setCurrentDateTime] = React.useState("");

  React.useEffect(() => {
    // Function to get the current date and time in the desired format
    const getCurrentDateTime = () => {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      const formattedTime = currentDate.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });

      return `${formattedDate} ${formattedTime}`;
    };

    // Set the current date and time
    setCurrentDateTime(getCurrentDateTime());
  }, []);

  const handleInputChange = (
    index: number,
    field: keyof Link,
    value: string,
    externalLink = false
  ) => {
    const updatedLinks = [...(externalLink ? externalLinks : links)];
    updatedLinks[index][field] = value;
    if (externalLink) {
      setExternalLinks(updatedLinks);
    } else {
      setLinks(updatedLinks);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleOpenMatch = () => setOpenMatch(true);
  const getMatchesForSport = async () => {
    try {
      const data = getSportFromSession();
      const d = new DateObject();
      const date = d.format("MM-DD-YYYY");
      if (!data.sport || !data.league) {
        notify("error", "Sport or league not found");
        return;
      }
      const response = await API_CALL.getMatches({
        sport: data.sport,
        league: data.league,
        date,
      });
      setOpen(false);
      setEditModalOpen(false);
      setOpenMatch(false)

      setData(response.data.data.sport);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      notify("error", error.response.data.message);
      setData(undefined);
    }
  };

  const isF1 = getSportFromSession().league === "f1"
  const isMMA = getSportFromSession().league === "ufc"
  const isTennis = getSportFromSession().league === "tournament"
  const isCfl = getSportFromSession().league === "cfl"

  const hasNoTeam = isF1 || isMMA || isTennis || isCfl

  const getTeamsForSport = async () => {
    if (hasNoTeam) return
    try {
      const data = JSON.parse(sessionStorage.getItem("sport") || "{}");
      if (!data.sport || !data.league) {
        return;
      }
      const response = await API_CALL.getTeams({ sport: data.sport, league: data.league });
      // Assuming response.data.data.sports is the array of sports
      const sports = response.data.data.sports as SportsType[];
      const flattenedData = sports.flatMap(sport =>
        sport.leagues.flatMap(league =>
          league.teams.map(team => ({
            id: team.team.id,
            teams: team.team.displayName,
            league: league.name,
            city: team.team.location,
            abbreviation: team.team.abbreviation,
            alternateColor: team.team.alternateColor,
            color: team.team.color,
            isActive: team.team.isActive,
            isAllStar: team.team.isAllStar,
            name: team.team.name,
            nickname: team.team.nickname,
            slug: team.team.slug,
            logos: team.team.logos
          }))
        )
      );
      setTeamData(flattenedData);
    } catch (error) {
      console.error("Error fetching matches for sport:", error);
    }
  };

  React.useEffect(() => {
    void getMatchesForSport();
    void getTeamsForSport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rows =
    data?.league?.events?.map((event, idx) => {
      const dateObj = new Date(event.date);
      const formattedDate = dateObj.toLocaleDateString();
      const time = dateObj.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const isUFC = data.league.slug.toLowerCase() === 'ufc';
      return {
        _id: event._id,
        id: idx + 1,
        date: formattedDate,
        time: time,
        homeTeam: event?.competitors?.length ? event.competitors[0]?.displayName : [],
        awayTeam: event?.competitors?.length ? event.competitors[1]?.displayName : [],
        homeLogo: isUFC ? event?.competitors?.length ? event.competitors[0]?.headshot : [] : event?.competitors?.length ? event.competitors[0]?.logo : [],
        awayLogo: isUFC ? event?.competitors ? event.competitors[1]?.headshot : [] : event?.competitors ? event.competitors[1]?.logo : [],
        leagueLogo: data.logo.href,
        description: event.description + " " + event.note,
        teams: `${event?.competitors?.length ? event.competitors[0]?.displayName : ""} vs ${event?.competitors?.length ? event.competitors[1]?.displayName : ""}`,
        league: data.league.name,
        streamingLinks: event.streamingLinks,
        externalLinks: event.externalLinks,
        isLocal: event.isLocal
      };
    }) || [];


  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleClose = async () => {
    setOpen(false);
    setOpenMatch(false)
  };

  const addStreamingLinkAndClose = async () => {
    const data = {
      ...getSportFromSession(),
      streamingLinks: links.map((val) => ({
        title: val.name,
        link: val.link as string,
      })),
      externalLinks: externalLinks.map((val) => ({
        title: val.name,
        link: val.link as string,
      })),
      date: new Date(),
    };
    try {
      const streamingLinks = data.streamingLinks.filter(val => val.title && val.link)
      const externalLinks = data.externalLinks.filter(val => val.title && val.link)
      const { date, league, sport } = data;
      await API_CALL.addStreamingLink({ streamingLinks, externalLinks, date, league, sport });
      notify("success", "Streaming links added successfully");
      setOpen(false);
      await getMatchesForSport();
    } catch (error) {
      notify("error", "Error adding streaming links");
    }
  };

  const updateStreamingLinkAndClose = async () => {
    const data = {
      ...getSportFromSession(),
      streamingLinks: links.map((val) => ({
        title: val.name,
        link: val.link as string,
      })),
      externalLinks: externalLinks.map((val) => ({
        title: val.name,
        link: val.link as string,
      })),
      date: new Date(),
    };
    try {
      await API_CALL.updateStreamingLink(selectedItem?._id, data);
      notify("success", "Streaming links updated successfully");
      setOpen(false);
      await getMatchesForSport();
    } catch (error) {
      notify("error", "Error updating streaming links");
    }
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "S.no",
      width: 70,
      sortable: false,
      headerClassName: styles.headerCell,
      cellClassName: styles.tableCell,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "date",
      headerName: "Date",
      width: 100,
      sortable: false,
      headerClassName: styles.headerCell,
      cellClassName: styles.tableCell,
    },
    {
      field: "time",
      headerName: "Time",
      width: 100,
      sortable: false,
      headerClassName: styles.headerCell,
      cellClassName: styles.tableCell,
    },
    {
      field: "description",
      headerName: "Matches",
      flex: 1,
      sortable: false,
      headerClassName: styles.headerCell,
      cellClassName: styles.tableCell,
      renderCell: (params) => (
        isF1 || (isMMA && params.row.isLocal) ?
          params.row.description :
          <Box display="flex" alignItems="center" height="100%">
            <Typography fontSize="13px" style={{ marginRight: '10px' }}>{params.row.homeTeam}</Typography>
            <img src={params.row.homeLogo} alt="Home Team Logo" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
            <Typography fontSize="13px" style={{ marginRight: '10px' }}>vs</Typography>
            <img src={params.row.awayLogo} alt="Away Team Logo" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
            <Typography fontSize="13px">{params.row.awayTeam}</Typography>
          </Box>
      ),
    },
    {
      field: "streamingLinks",
      headerName: "Streaming Links",
      flex: 1,
      sortable: false,
      headerClassName: styles.headerCell,
      cellClassName: styles.tableCell,
      renderCell: (cell) => {
        const links = (cell.row.streamingLinks as any[]);

        return (
          <Box>
            {links.map((val, idx) => (
              <>
                <Typography component="a" sx={{ textDecoration: "none", color: "#448bff" }} variant="body2" href={val.link} target="_blank" rel="noreferrer">
                  {val.title}
                </Typography>
                {idx !== links.length - 1 && ", "}
              </>
            )
            )}
          </Box>
        )
      },
    },
    {
      field: "externalLinks",
      headerName: "External Links",
      flex: 1,
      sortable: false,
      headerClassName: styles.headerCell,
      cellClassName: styles.tableCell,
      renderCell: (cell) => {
        const links = (cell.row.externalLinks as any[]);

        return (
          <Box>
            {links.map((val, idx) => (
              <>
                <Typography component="a" sx={{ textDecoration: "none", color: "#448bff" }} variant="body2" href={val.link} target="_blank" rel="noreferrer">
                  {val.title}
                </Typography>
                {idx !== links.length - 1 && ", "}
              </>
            )
            )}
          </Box>
        )
      },
    },
    {
      field: "actions",
      headerName: "Action",
      align: "center",
      headerAlign: "center",
      renderCell: (cell) => (
        <Box display="flex" height="100%" alignItems={"center"}>
          <>
            <IconButton onClick={() => handleEditOpen(cell.row)}>
              <Avatar
                src={EditIcon}
                alt="edit Icon"
                sx={{ height: "20px", width: "20px", borderRadius: 0 }}
              />
            </IconButton>
            &nbsp;&nbsp;&nbsp;
            {cell.row.isLocal && (
              <IconButton onClick={() => deleteMatch(cell.row._id)}>
                <Avatar
                  src={TrashIcon}
                  alt="trash Icon"
                  sx={{ height: "20px", width: "20px", borderRadius: 0 }}
                />
              </IconButton>
            )}
          </>
        </Box>
      ),
    },
  ];


  const addMatches = async () => {
    const randomId = Math.random().toString().slice(2, 12);
    const competitors = teamData.filter(team => team.slug === matchData.homeTeam || team.slug === matchData.awayTeam).map(team => {
      const clonedTeam = { ...team }
      const logo = typeof clonedTeam.logos === "object" ? (clonedTeam.logos.length > 3 ? clonedTeam.logos[2] : clonedTeam.logos[0]) : clonedTeam.logos

      delete clonedTeam.links
      delete clonedTeam.logos
      return { ...clonedTeam, logo: logo?.href, displayName: clonedTeam.teams }
    })

    if (competitors.length === 1) {
      notify("error", "Match cannot be created between two same entities")
      return
    }

    const date = matchData.date;
    const now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
      date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());

    try {
      const data = getSportFromSession();
      if (!data.sport || !data.league) {
        notify("error", "Sport or league not found");
        return;
      }

      const response = await API_CALL.addMatches({
        sport: data.sport,
        league: data.league,
        date: new Date(now_utc),
        isLocal: true,
        matchId: randomId,
        eventId: randomId,
        description: matchData.description,
        note: matchData.note,
        competitors
      });
      setOpenMatch(false)
      setData(response.data.data.sport);
      notify("success", "Match added successfully!");
      void getMatchesForSport();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      notify("error", error.response.data.message);
    }
  };

  const deleteMatch = async (id: string) => {
    try {
      await API_CALL.deleteMatch(id)
      notify("success", "Match deleted successfully!");
      void getMatchesForSport();
    } catch (e) {
      console.log(e)
    }
  }

  const options = teamData.map(match => ({ ...match, label: match.teams, value: match.slug }))

  const deleteLink = (idx: number, isExternal = false) => {
    if (isExternal) {
      setExternalLinks(prev => prev.filter((_, id) => id !== idx))
      notify("success", "External link deleted successfully!");
    } else {
      setLinks(prev => prev.filter((_, id) => id !== idx))
      notify("success", "streaming links deleted successfully!");
    }
  }

  return (
    <Box component="div">
      <PageHeader title="Matches" />
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
          value={search}
          onChange={e => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          title="Add Matches"
          variant="contained"
          onClick={handleOpenMatch}
          sx={{ marginRight: 2 }}
        >
          Add Matches
        </Button>
        <Button
          title="Add Streaming Links"
          variant="contained"
          onClick={handleOpen}
        >
          Add Streaming Links
        </Button>
      </Box>

      <Table
        rows={rows.filter(val => `${val.awayTeam} vs ${val.homeTeam}`.toLowerCase().includes(search.toLowerCase()))}
        columns={columns}
        columnHeaderHeight={54}
        rowHeight={64}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        sx={{
          backgroundColor: "#ffff",
          height: rows.length === 0 ? "200px" : "auto",
        }}
        pageSizeOptions={[5, 10]}
        className={styles.dataGrid}
        disableColumnFilter
        checkboxSelection
        disableColumnMenu
        disableRowSelectionOnClick
        localeText={{
          noRowsLabel: "No Data available",
        }}
      />

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openMatch}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={{
          "& .css-vtbemp": {
            borderRadius: "24px",
            borderColor: "transparent",
            width: "60%",
            maxHeight: "85%",
            overflow: "auto",
            p: "32px",
          },
        }}
      >
        <Fade in={openMatch}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h2"
              component="h2"
              sx={{ fontWeight: 600, mb: 4, textAlign: "center" }}
            >
              Add Matches
            </Typography>
            <Box id="transition-modal-description">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{ maxWidth: "780px", width: "100%" }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} >
                      <DateTimePicker
                        label="Select a Sport"
                        defaultValue={matchDate}
                        sx={{
                          width: "100%",
                          height: "53px",
                          backgroundColor: "#F5F6FA",
                          border: "0.4px solid #D5D5D5",
                          fontSize: "14px",
                          fontWeight: 400,
                          borderRadius: "4px",
                          marginTop: "28px",
                          outline: "none",
                          "& .MuiInputBase-input.MuiOutlinedInput-input": {
                            height: "20px"
                          }
                        }}
                        onChange={(e) => handleDateChange(e)}
                      />
                    </Grid>
                    {hasNoTeam ? (
                      <>
                        <Grid item xs={6}>
                          <AppInput label="Event Name" name="description" value={matchData.description} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                          <AppInput label="Event Type" name="note" value={matchData.note} onChange={handleChange} />
                        </Grid>
                      </>
                    ) : (
                      <>
                        <Grid item xs={6}>
                          <AppInput label="Home Team" selectOptions={options} name="homeTeam" onChange={handleChange} value={matchData.homeTeam} />
                        </Grid>
                        <Grid item xs={6}>
                          <AppInput label="Away Team" selectOptions={options} name="awayTeam" onChange={handleChange} value={matchData.awayTeam} />
                        </Grid>
                      </>
                    )}
                  </Grid>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  columnGap: 1,
                  mt: 2,
                  pb: 2,
                  float: "right",
                }}
              >
                <Button
                  title="Add Streaming Links"
                  variant="outlined"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  title="Add Streaming Links"
                  variant="contained"
                  onClick={addMatches}
                >
                  Apply now
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={{
          "& .css-vtbemp": {
            borderRadius: "24px",
            borderColor: "transparent",
            width: "60%",
            maxHeight: "85%",
            overflow: "auto",
            p: "32px",
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h2"
              component="h2"
              sx={{ fontWeight: 600, mb: 4, textAlign: "center" }}
            >
              Apply Streaming Links
            </Typography>
            <Box id="transition-modal-description" sx={{ mt: 2 }}>
              <Box sx={{ display: "flex", flexDirection: "column", rowGap: 2 }}>
                {links.map((link, index) => (
                  <Box key={index}>
                    <Typography>{link.label}:</Typography>
                    <Box display="flex" columnGap="20px" alignItems="flex-end" mt={1}>
                      <Box width="30%">
                        <AppInput
                          label="Name"
                          placeholder="HD"
                          value={link.name}
                          onChange={(e) =>
                            handleInputChange(index, "name", e.target.value)
                          }
                        />
                      </Box>
                      <Box flex={1}>
                        <AppInput
                          label="Link"
                          placeholder="https://www.soccerstream1234.com./soccerlive/today/4785478"
                          value={link.link}
                          onChange={(e) =>
                            handleInputChange(index, "link", e.target.value)
                          }
                        />
                      </Box>
                      {links.length !== 1 && (
                        <IconButton onClick={() => deleteLink(index)}>
                          <Avatar
                            src={TrashIcon}
                            alt="trash Icon"
                            sx={{ height: "20px", width: "20px", borderRadius: 0 }}
                          />
                        </IconButton>
                      )}
                    </Box>
                  </Box>
                ))}
                <Box>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleAddLink}
                  >
                    Add more links
                  </Button>
                </Box>
              </Box>
              <Divider sx={{ mt: 3, mb: 2 }} />

              <Box>
                <Typography
                  id="transition-modal-title"
                  variant="h2"
                  component="h2"
                  sx={{ fontWeight: 600, mb: 4, textAlign: "center" }}
                >
                  Ads Link
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#434343",
                    fontWeight: 400,
                    mb: "40px",
                  }}
                  textAlign="center"
                >
                  * This link will redirect user away from the current website
                </Typography>
                <Box>
                  {externalLinks.map((link, index) => (
                    <Box key={index}>
                      <Typography>{link.label}:</Typography>
                      <Box display="flex" columnGap="20px" alignItems="flex-end" mt={1} mb={2}>
                        <Box width="30%">
                          <AppInput
                            label="Name"
                            placeholder="HD"
                            value={link.name}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "name",
                                e.target.value,
                                true
                              )
                            }
                          />
                        </Box>
                        <Box flex={1}>
                          <AppInput
                            label="Link"
                            placeholder="https://www.soccerstream1234.com./soccerlive/today/4785478"
                            value={link.link}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "link",
                                e.target.value,
                                true
                              )
                            }
                          />
                        </Box>
                        {externalLinks.length !== 1 && (
                          <IconButton onClick={() => deleteLink(index, true)}>
                            <Avatar
                              src={TrashIcon}
                              alt="trash Icon"
                              sx={{ height: "20px", width: "20px", borderRadius: 0 }}
                            />
                          </IconButton>
                        )}
                      </Box>
                    </Box>
                  ))}
                  <Box>
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={handleAddExternalLink}
                    >
                      Add more links
                    </Button>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  columnGap: 1,
                  mt: 2,
                  pb: 2,
                  float: "right",
                }}
              >
                <Button
                  title="Add Streaming Links"
                  variant="outlined"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  title="Add Streaming Links"
                  variant="contained"
                  onClick={addStreamingLinkAndClose}
                >
                  Apply now
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={editModalOpen}
        onClose={handleEditClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={{
          "& .css-vtbemp": {
            borderRadius: "24px",
            borderColor: "transparent",
            width: "60%",
            maxHeight: "85%",
            overflow: "auto",
            p: "32px",
          },
        }}
      >
        <Fade in={editModalOpen}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h2"
              component="h2"
              sx={{ fontWeight: 600, mb: 4, textAlign: "center" }}
            >
              Apply Streaming Links
            </Typography>
            <Box display={"flex"} alignItems={"center"} columnGap={3}>
              <Typography>{selectedItem?.id}:</Typography>
              <Box display={"flex"} alignItems={"center"} columnGap={2}>
                <img width={24} src={selectedItem?.homeLogo} alt="logo1" />{" "}
                {selectedItem?.homeTeam} vs{" "}
                <img width={24} src={selectedItem?.awayLogo} alt="logo1" />{" "}
                {selectedItem?.awayTeam}{" "}
                <img width={24} src={selectedItem?.leagueLogo} alt="logo1" />{" "}
                {selectedItem?.league} {currentDateTime}
              </Box>
            </Box>
            <Box id="transition-modal-description" sx={{ mt: 2 }}>
              <Box sx={{ display: "flex", flexDirection: "column", rowGap: 2 }}>
                {links.map((link, index) => (
                  <Box key={index}>
                    <Typography>{link.label}:</Typography>
                    <Box display="flex" columnGap="20px" mt={1}>
                      <Box width="30%">
                        <AppInput
                          label="Name"
                          placeholder="HD"
                          value={link.name}
                          onChange={(e) =>
                            handleInputChange(index, "name", e.target.value)
                          }
                        />
                      </Box>
                      <Box flex={1}>
                        <AppInput
                          label="Link"
                          placeholder="https://www.soccerstream1234.com./soccerlive/today/4785478"
                          value={link.link}
                          onChange={(e) =>
                            handleInputChange(index, "link", e.target.value)
                          }
                        />
                      </Box>
                    </Box>
                  </Box>
                ))}
                <Box>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleAddLink}
                  >
                    Add more links
                  </Button>
                </Box>
              </Box>
              <Divider sx={{ mt: 3, mb: 2 }} />

              <Box>
                <Typography
                  id="transition-modal-title"
                  variant="h2"
                  component="h2"
                  sx={{ fontWeight: 600, mb: 4, textAlign: "center" }}
                >
                  Ads Link
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#434343",
                    fontWeight: 400,
                    mb: "40px",
                  }}
                  textAlign="center"
                >
                  * This link will redirect user away from the current website
                </Typography>
                <Box>
                  {externalLinks.map((link, index) => (
                    <Box key={index}>
                      <Typography>{link.label}:</Typography>
                      <Box display="flex" columnGap="20px" mt={1} mb={2}>
                        <Box width="30%">
                          <AppInput
                            label="Name"
                            placeholder="HD"
                            value={link.name}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "name",
                                e.target.value,
                                true
                              )
                            }
                          />
                        </Box>
                        <Box flex={1}>
                          <AppInput
                            label="Link"
                            placeholder="https://www.soccerstream1234.com./soccerlive/today/4785478"
                            value={link.link}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "link",
                                e.target.value,
                                true
                              )
                            }
                          />
                        </Box>
                      </Box>
                    </Box>
                  ))}
                  <Box>
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={handleAddExternalLink}
                    >
                      Add more links
                    </Button>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  columnGap: 1,
                  mt: 2,
                  pb: 2,
                  float: "right",
                }}
              >
                <Button
                  title="Add Streaming Links"
                  variant="outlined"
                  onClick={handleEditClose}
                >
                  Cancel
                </Button>
                <Button
                  title="Add Streaming Links"
                  variant="contained"
                  onClick={updateStreamingLinkAndClose}
                >
                  Apply now
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}

export default Matches;
