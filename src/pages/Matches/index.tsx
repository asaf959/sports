import { Avatar, Box, Divider, InputAdornment, styled } from "@mui/material";
import PageHeader from "../../components/header";
import styles from "./style.module.scss";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Input from "../../components/input";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "../../components/button";
import Backdrop from "@mui/material/Backdrop";
import EditIcon from "../../assets/svg/edit.svg";

import IconButton from "../../components/iconButton";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import API_CALL from "../../services";
import DateObject from "react-date-object";
import AppInput from "../../components/newInput";
import AddIcon from "@mui/icons-material/Add";
import { getSportFromSession } from "../../utils/utils";

interface Link {
  label: string;
  name: string;
  link?: string;
  ExternalLink?: string;
}

type ApiDataType = {
  league: {
    name: string
    events: {
      _id: string
      date: Date
      competitors: {
        displayName: string
        logo: string
      }[]
      streamingLinks: {

      }[]
      externalLinks: {

      }[]
    }[]
  }
  logo: {
    href: string
  }
}

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
  const [data, setData] = React.useState<ApiDataType>();
  const [open, setOpen] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedItem, setSelectedItem] = React.useState<any>();
  const handleEditClose = () => setEditModalOpen(false);

  const [links, setLinks] = React.useState<Link[]>([
    { label: "Link 1", name: "", link: "" },
    { label: "Link 2", name: "", link: "" },
  ]);
  const [externalLinks, setExternalLinks] = React.useState<Link[]>([
    { label: "External Link 1", name: "", ExternalLink: "" },
  ]);

  React.useEffect(() => {

  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditOpen = (data: any) => {
    setSelectedItem(data);
    setEditModalOpen(true);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setLinks(data.streamingLinks.map((val: any, idx: number) => ({ label: `Link ${idx + 1}`, name: val.title, link: val.link })))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setExternalLinks(data.externalLinks.map((val: any, idx: number) => ({ label: `External Link ${idx + 1}`, name: val.title, link: val.link })))
  }

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

  const handleInputChange = (index: number, field: keyof Link, value: string, externalLink = false) => {
    const updatedLinks = [...(externalLink ? externalLinks : links)];
    updatedLinks[index][field] = value;
    if (externalLink) {
      setExternalLinks(updatedLinks);
    } else {
      setLinks(updatedLinks);
    }
  };

  const handleOpen = () => setOpen(true);

  const getMatchesForSport = async () => {
    try {
      const data = getSportFromSession();
      const d = new DateObject();
      const date = d.format("MM-DD-YYYY");
      if (!data.sport || !data.league) {
        console.error("Sport or league not found");
        return;
      }
      const response = await API_CALL.getMatches({
        sport: data.sport,
        league: data.league,
        date,
      });
      setOpen(false)
      setEditModalOpen(false)
      setData(response.data.data.sport);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(
        "Error fetching matches for sport:",
        error.response.data.message
      );
    }
  };
  React.useEffect(() => {
    void getMatchesForSport();
  }, []);

  const rows =
    data?.league?.events?.map((event, idx) => {
      const dateObj = new Date(event.date);
      const formattedDate = dateObj.toLocaleDateString();
      const time = dateObj.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      return {
        _id: event._id,
        id: idx + 1,
        date: formattedDate,
        time: time,
        homeTeam: event.competitors[0].displayName,
        awayTeam: event.competitors[1].displayName,
        homeLogo: event.competitors[0].logo,
        awayLogo: event.competitors[1].logo,
        leagueLogo: data.logo.href,
        teams: `${event.competitors[0].displayName} vs ${event.competitors[1].displayName}`,
        league: data.league.name,
        streamingLinks: event.streamingLinks,
        externalLinks: event.externalLinks,
        // streamingLinks: event.streamingLinks.map(link => link.href).join(', '),
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
  };

  const addStreamingLinkAndClose = async () => {
    const data = {
      ...getSportFromSession(),
      streamingLinks: links.map(val => ({ title: val.name, link: val.link as string })),
      externalLinks: externalLinks.map(val => ({ title: val.name, link: val.link as string })),
      date: new Date()
    };
    try {
      await API_CALL.addStreamingLink(data);
      console.log("Streaming links added successfully");
      setOpen(false);
      await getMatchesForSport()
    } catch (error) {
      console.error("Error adding streaming links:", error);
    }
  };

  const updateStreamingLinkAndClose = async () => {
    const data = {
      ...getSportFromSession(),
      streamingLinks: links.map(val => ({ title: val.name, link: val.link as string })),
      externalLinks: externalLinks.map(val => ({ title: val.name, link: val.link as string })),
      date: new Date()
    };
    try {
      await API_CALL.updateStreamingLink(selectedItem?._id, data);
      console.log("Streaming links updated successfully");
      setOpen(false);
      await getMatchesForSport()
    } catch (error) {
      console.error("Error adding streaming links:", error);
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
      flex: 1,
      sortable: false,
      headerClassName: styles.headerCell,
      cellClassName: styles.tableCell,
    },
    {
      field: "time",
      headerName: "Time",
      flex: 1,
      sortable: false,
      headerClassName: styles.headerCell,
      cellClassName: styles.tableCell,
    },
    {
      field: "teams",
      headerName: "Teams",
      flex: 1,
      sortable: false,
      headerClassName: styles.headerCell,
      cellClassName: styles.tableCell,
    },

    {
      field: "league",
      headerName: "League",
      flex: 1,
      sortable: false,
      headerClassName: styles.headerCell,
      cellClassName: styles.tableCell,
    },
    {
      field: "streamingLinks",
      headerName: "Link 1",
      flex: 1,
      sortable: false,
      headerClassName: styles.headerCell,
      cellClassName: styles.tableCell,
      renderCell: (cell) => (
        <Box>{(cell.row.streamingLinks as any[]).map(val => val.link).join(", ")}</Box>
      )
    },
    {
      field: "externalLinks",
      headerName: "Link 2",
      flex: 1,
      sortable: false,
      headerClassName: styles.headerCell,
      cellClassName: styles.tableCell,
      renderCell: (cell) => (
        <Box>{(cell.row.externalLinks as any[]).map(val => val.link).join(", ")}</Box>
      )
    },
    {
      field: "actions",
      headerName: "Action",
      align: "center",
      headerAlign: "center",
      renderCell: (cell) => (
        <Box display="flex">
          <>
            <IconButton onClick={() => handleEditOpen(cell.row)}>
              <Avatar
                src={EditIcon}
                alt="edit Icon"
                sx={{ height: "20px", width: "20px", borderRadius: 0 }}
              />
            </IconButton>
          </>
        </Box>
      ),
    },
  ];

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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          title="Add Streaming Links"
          variant="contained"
          onClick={handleOpen}
        >
          Add Streaming Links
        </Button>
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
                              handleInputChange(index, "name", e.target.value, true)
                            }
                          />
                        </Box>
                        <Box flex={1}>
                          <AppInput
                            label="Link"
                            placeholder="https://www.soccerstream1234.com./soccerlive/today/4785478"
                            value={link.link}
                            onChange={(e) =>
                              handleInputChange(index, "link", e.target.value, true)
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
                <img width={24} src={selectedItem?.homeLogo} alt="logo1" /> {selectedItem?.homeTeam} vs{" "}
                <img width={24} src={selectedItem?.awayLogo} alt="logo1" /> {selectedItem?.awayTeam}{" "}
                <img width={24} src={selectedItem?.leagueLogo} alt="logo1" /> {selectedItem?.league} {currentDateTime}
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
                              handleInputChange(index, "name", e.target.value, true)
                            }
                          />
                        </Box>
                        <Box flex={1}>
                          <AppInput
                            label="Link"
                            placeholder="https://www.soccerstream1234.com./soccerlive/today/4785478"
                            value={link.link}
                            onChange={(e) =>
                              handleInputChange(index, "link", e.target.value, true)
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
