import { Box, Grid, Paper } from "@mui/material";
import PageHeader from "../../components/header";
import { Button } from "../../components/button";
import AppInput from "../../components/newInput";
import sports from "../../utils/sports";
import { useEffect, useState } from "react";
import API_CALL from "../../services";
import { getSportFromSession } from "../../utils/utils";
import notify from "../../utils/notify";

function Combination() {
  const [inputs, setInputs] = useState({
    sport1: "",
    sport2: "",
    sport3: "",
    sport4: "",
  });

  const combination = Object.values(inputs).map(sport => {
    const data = sports.find(val => val.value === sport)

    return {
      name: data?.label.toLowerCase().split(" ")[0] || "",
      league: data?.value || ""
    }
  })

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // async function createCombination() {
  //   await API_CALL.createCombination({ ...getSportFromSession(), combination })
  // }

  async function createCombination() {
    try {
      await API_CALL.createCombination({ ...getSportFromSession(), combination });
      notify("success", "Combination created successfully!");
    } catch (error: any) {
      notify("error", error.response.data.message);
    }
  }

  async function getCombination() {
    const sportArr = [Object.values(getSportFromSession())[0], Object.values(getSportFromSession())[1]] as const
    const { data: res } = await API_CALL.getCombination(...sportArr)
    setInputs(((prev) => {
      const obj = { ...inputs }
      const arr = (res.data?.combination?.combination as Record<string, string>[])?.map(val => val?.league).slice(0, 4) || []
      arr.forEach((val: string, id: number) => {
        const inputArr = Object.keys(inputs) as unknown as keyof typeof inputs[] as keyof typeof inputs
        const idx = inputArr[id] as keyof typeof inputs
        obj[idx] = val
      })
      return { ...prev, ...obj }
    }))
  }

  useEffect(() => {
    getCombination()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(inputs);

  return (
    <Box component="div">
      <PageHeader title="Combination" />
      <Paper variant="outlined" sx={{ borderRadius: "16px" }}>
        <Box
          sx={{
            padding: "60px 176px", // top and bottom padding: 60px, left and right padding: 176px
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{ maxWidth: "780px", width: "100%" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6} sx={{ marginBottom: "30px" }}>
                <AppInput label="Sports 1" selectOptions={sports} name="sport1" onChange={handleInputChange} value={inputs.sport1} />
              </Grid>
              <Grid item xs={6} sx={{ marginBottom: "30px" }}>
                <AppInput label="Sports 2" selectOptions={sports} name="sport2" onChange={handleInputChange} value={inputs.sport2} />
              </Grid>
              <Grid item xs={6}>
                <AppInput label="Sports 3" selectOptions={sports} name="sport3" onChange={handleInputChange} value={inputs.sport3} />
              </Grid>
              <Grid item xs={6}>
                <AppInput label="Sports 4" selectOptions={sports} name="sport4" onChange={handleInputChange} value={inputs.sport4} />
              </Grid>
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
                onClick={createCombination}
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

export default Combination;
