import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import PageHeader from "../../components/header";
import TrashIcon from "../../assets/svg/trash.svg";
import { Button } from "../../components/button";
import AppInput from "../../components/newInput";
import { useEffect, useState } from "react";
import API_CALL from "../../services";
import notify from "../../utils/notify";

import { getSportFromSession } from "../../utils/utils";
import defaultChannels from "./defaultChannels";
import IconButton from "../../components/iconButton";

function Channels() {
  const emptyChannel = { title: "", link: "", icon: "", value: "" };
  const [channels, setChannels] = useState([emptyChannel]);


  function onChange(idx: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setChannels(prev => {
      const arr = [...prev]
      const el = e.target.name as keyof typeof channels[0]
      arr[idx][el] = e.target.value
      if (el === "title") {
        const currentChannel = defaultChannels.find(val => val.value === e.target.value)
        arr[idx].title = currentChannel?.label || ""
        arr[idx].icon = currentChannel?.icon || ""
        arr[idx].value = currentChannel?.value || ""
      } else {
        arr[idx][el] = e.target.value
      }
      return arr
    })
  }

  function addChannel() {
    setChannels(prev => [...prev, emptyChannel])
  }

  function deleteChannel(idx: number) {
    setChannels(prev => prev.filter((_, id) => id !== idx))
  }

  async function createChannel() {
    const isNotEmpty = channels.find(val => val.title && val.link)
    if (isNotEmpty) {
      try {
        await API_CALL.createChannel({ ...getSportFromSession(), alternateLinks: channels })
        notify("success", "Channels Updated Successfully");
      } catch (e) {
        console.log(e);
      }
    } else {
      notify("error", "Please select atleast one channel and enter its link");
    }
  }

  async function getChannels() {
    try {
      const sportArr = [Object.values(getSportFromSession())[0], Object.values(getSportFromSession())[1]] as const
      const { data: res } = await API_CALL.getChannels(...sportArr)
      const filtered = res.data.channels.links.map((val: any) => ({ title: val.title, icon: val.icon, value: val.title, link: val.link }))
      setChannels(filtered)
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getChannels()
  }, []);

  return (
    <Box component="div">
      <PageHeader title="Channels" />
      <Paper variant="outlined" sx={{ borderRadius: "16px" }}>
        <Box
          sx={{
            padding: "60px 176px", // top and bottom padding: 60px, left and right padding: 176px
            justifyContent: "center"
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Grid container spacing={2}>
              {channels.map((val, idx) => (
                <Box
                  key={idx}
                  width="100%"
                  display={"flex"}
                  alignItems={"center"}
                  columnGap={2}
                >
                  <Typography sx={{ fontSize: "28px", fontWeight: 700 }}>
                    0{idx + 1}
                  </Typography>
                  <Box width={"100%"} display="flex" alignItems="flex-end" padding={1} columnGap={2} sx={{ marginBottom: "30px" }} >
                    <Grid item xs={6}>
                      <AppInput name="title" label="Channel Name" selectOptions={defaultChannels} value={val.value} onChange={(e) => onChange(idx, e)} />
                    </Grid>
                    <Grid item xs={6}>
                      <AppInput name="link" label="Channel link" placeholder="Enter the channel link" value={val.link} onChange={(e) => onChange(idx, e)} />
                    </Grid>
                    <Grid item xs={2}>
                      {channels.length > 1 && (
                        <IconButton onClick={() => deleteChannel(idx)}>
                          <Avatar
                            src={TrashIcon}
                            alt="trash Icon"
                            sx={{ height: "20px", width: "20px", borderRadius: 0 }}
                          />
                        </IconButton>
                      )}
                    </Grid>
                  </Box>
                </Box>
              ))}
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "60px",
                gap: 4
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                size="large"
                fullWidth
                sx={{ width: "274px" }}
                onClick={addChannel}
              >
                Add Channel
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{ width: "274px" }}
                onClick={createChannel}
              >
                Save
              </Button>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default Channels;
