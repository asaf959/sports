import { Box, Grid, Paper } from "@mui/material";
import PageHeader from "../../components/header";
import { Button } from "../../components/button";
import AppInput from "../../components/newInput";
import { useEffect, useState } from "react";
import API_CALL from "../../services";
import { getSportFromSession } from "../../utils/utils";

function Combination() {
  const [inputs, setInputs] = useState({
    sport1: "",
    sport2: "",
    sport3: "",
    sport4: "",
  });

  const sports = [
    { value: "mlb", label: "Baseball (MLB)" },
    { value: "nba", label: "Basketball (NBA)" },
    { value: "cfl", label: "Football (CFL)" },
    { value: "nfl", label: "Football (NFL)" },
    { value: "nhl", label: "Hockey (NHL)" },
    { value: "ufc", label: "MMA (UFC)" },
    { value: "f1", label: "Racing (F1)" },
    { value: "tennis", label: "Tennis" },
  ];

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

  async function createCombination() {
    await API_CALL.createCombination({ ...getSportFromSession(), combination })
  }

  // async function getCombination() {
  //   const sportArr = [Object.values(getSportFromSession())[0], Object.values(getSportFromSession())[1]] as const;
  //   const { data: res } = await API_CALL.getCombination(...sportArr);
  //   console.log("Fetched data:", res.data.combination.combination);
   
  //   const updatedInputs = { ...inputs };
  //   res.data.combination.combination.forEach((val: any, id: number) => {
  //      const inputKey = Object.keys(inputs)[id];
  //      // Find the corresponding option in your selectOptions based on the sport name
  //      const matchingOption = sports.find(option => option.label.toLowerCase().includes(val.sport.toLowerCase()));
  //      updatedInputs[inputKey] = matchingOption ? matchingOption.value : '';
  //   });
   
  //   console.log("Updated inputs:", updatedInputs);
  //   setInputs(updatedInputs);
  //  }
  async function getCombination() {
    const sportArr = [Object.values(getSportFromSession())[0], Object.values(getSportFromSession())[1]] as const;
    const { data: res } = await API_CALL.getCombination(...sportArr);
    console.log("Fetched data:", res.data.combination.combination);
   
    const updatedInputs = { ...inputs };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    res.data.combination.combination.forEach((val: any, id: number) => {
       const inputKey = Object.keys(inputs)[id];
       // Find the corresponding option in your selectOptions based on the sport name
       const matchingOption = sports.find(option => option.label.toLowerCase().includes(val.sport.toLowerCase()));
       updatedInputs[inputKey as keyof typeof updatedInputs] = matchingOption ? matchingOption.value : '';
    });
   
    console.log("Updated inputs:", updatedInputs);
    setInputs(updatedInputs);
   }
   
   
   
   console.log(inputs)

  useEffect(() => {
    getCombination()
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
              {/* <Grid item xs={6}>
                <AppInput label="Sports 3" selectOptions={sports} name="sport3" onChange={handleInputChange} value={inputs.sport3} />
              </Grid>
              <Grid item xs={6}>
                <AppInput label="Sports 4" selectOptions={sports} name="sport4" onChange={handleInputChange} value={inputs.sport4} />
              </Grid> */}
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
