import { Box, Grid, Paper, Typography } from "@mui/material";
import PageHeader from "../../components/header";
import { Button } from "../../components/button";
import AppInput from "../../components/newInput";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import API_CALL from "../../services";
import { getSportFromSession } from "../../utils/utils";

function AlternateLinks() {
  const language = [
    { value: "english", label: "English" },
    { value: "urdu", label: "Urdu" },
    { value: "arabic", label: "Arabic" },
  ];
  const [links, setLinks] = useState([
    { title: "", link: "", language: "", ads: "" },
    { title: "", link: "", language: "", ads: "" },
    { title: "", link: "", language: "", ads: "" },
  ]);

  const handleAddLink = () => {
    setLinks((prevLinks) => [
      ...prevLinks,
      { title: "", link: "", language: "", ads: "" },
    ]);
  };

  function onChange(idx: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setLinks(prev => {
      const arr = [...prev]
      const el = e.target.name as keyof typeof links[0]
      arr[idx][el] = e.target.value
      return arr
    })
  }

  async function createAlternativeLink() {
    try {
      await API_CALL.createAlternativeLink({
        ...getSportFromSession(),
        alternateLinks: links
      })
    } catch (e) {
      console.log(e);
    }
  }

  async function getAlternativeLinks() {
    try {
      const sportArr = [Object.values(getSportFromSession())[0], Object.values(getSportFromSession())[1]] as const
      const { data: res } = await API_CALL.getAlternativeLinks(...sportArr)

      console.log(res.data.alternateLinks);
      if (res.data.alternateLinks && res.data.alternateLinks.links.length > 0) {
        setLinks(res.data.alternateLinks.links)
        console.log(res.data.alternateLinks.links);

      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getAlternativeLinks()
  }, []);

  return (
    <Box component="div">
      <PageHeader title="Alternate Links" />
      <Paper variant="outlined" sx={{ borderRadius: "16px" }}>
        <Box
          sx={{
            padding: "60px 176px", // top and bottom padding: 60px, left and right padding: 176px
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Box width="100%">
                <>
                  {links.map((link, idx) => (
                    <Box key={idx}>
                      <Typography
                        sx={{ fontSize: "18px", fontWeight: 700, ml: 1 }}
                      >
                        Link {idx + 1}:
                      </Typography>
                      <Box
                        width={"100%"}
                        display={"flex"}
                        padding={1}
                        columnGap={2}
                      >
                        <Grid item xs={6} sx={{ marginBottom: "30px" }}>
                          <AppInput
                            name="title"
                            label="Channel Name"
                            placeholder="Enter the channel name"
                            value={link.title}
                            onChange={(e) => onChange(idx, e)}
                          />
                        </Grid>
                        <Grid item xs={6} sx={{ marginBottom: "30px" }}>
                          <AppInput
                            name="link"
                            label="Link"
                            placeholder="Enter the channel link"
                            value={link.link}
                            onChange={(e) => onChange(idx, e)}
                          />
                        </Grid>
                        <Grid item xs={6} sx={{ marginBottom: "30px" }}>
                          <AppInput
                            name="language"
                            label="Language"
                            placeholder="Select a language"
                            onChange={(e) => onChange(idx, e)}
                            value={link.language}
                            selectOptions={language} // Assuming language is defined
                          />
                        </Grid>
                        <Grid item xs={6} sx={{ marginBottom: "30px" }}>
                          <AppInput
                            name="ads"
                            label="Ads"
                            placeholder="Enter the number of Ads"
                            value={link.ads}
                            onChange={(e) => onChange(idx, e)}
                          />
                        </Grid>
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
                </>
              </Box>
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
                onClick={createAlternativeLink}
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

export default AlternateLinks;
