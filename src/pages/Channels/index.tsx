import { Box, Grid, Paper, Typography } from "@mui/material";
import PageHeader from "../../components/header";
import { Button } from "../../components/button";
import AppInput from "../../components/newInput";
import { useEffect, useState } from "react";
import API_CALL from "../../services";
import { getSportFromSession } from "../../utils/utils";

function Channels() {
  const [channels, setChannels] = useState([
    { title: "", link: "" },
    { title: "", link: "" },
    { title: "", link: "" },
    { title: "", link: "" }
  ]);

  // function onChange(idx: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
  //   setChannels(prev => {
  //     const arr = [...prev]
  //     arr[idx][e.target.name] = e.target.value
  //     return arr
  //   })
  // }
  function onChange(idx: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setChannels(prev => {
      const arr = [...prev];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (arr[idx] as any)[name] = value;
      return arr;
    });
  }

  async function createChannel() {
    try {
      await API_CALL.createChannel({ ...getSportFromSession(), alternateLinks: channels })
    } catch (e) {
      console.log(e);
    }
  }

  async function getChannels() {
    try {
      const sportArr = [Object.values(getSportFromSession())[0], Object.values(getSportFromSession())[1]] as const
      const { data: res } = await API_CALL.getChannels(...sportArr)
      setChannels(res.data.channels.links)
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
                  <Box width={"100%"} display={"flex"} padding={1} columnGap={2}>
                    <Grid item xs={6} sx={{ marginBottom: "30px" }}>
                      <AppInput name="title" label="Channel Name" placeholder="Enter the channel name" value={val.title} onChange={(e) => onChange(idx, e)} />
                    </Grid>
                    <Grid item xs={6} sx={{ marginBottom: "30px" }}>
                      <AppInput name="link" label="Channel link" placeholder="Enter the channel link" value={val.link} onChange={(e) => onChange(idx, e)} />
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
              }}
            >
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
