import { Box, Paper } from "@mui/material";
import PageHeader from "../../components/header";
import { Button } from "../../components/button";
import AppInput from "../../components/newInput";
import { useEffect, useState } from "react";
import API_CALL from "../../services";
import { getSportFromSession } from "../../utils/utils";
function Dashboard() {
  const [link, setLink] = useState("");

  // async function getMasterLink() {
  //   const sportArr = [Object.values(getSportFromSession())[0], Object.values(getSportFromSession())[1]] as const
  //   const { data: res } = await API_CALL.getMasterLink(...sportArr)

  //   setLink(res.data.masterLink.link);
  // }

  async function getMasterLink() {
    try {
       const sportArr = [Object.values(getSportFromSession())[0], Object.values(getSportFromSession())[1]] as const;
       const { data: res } = await API_CALL.getMasterLink(...sportArr);
   
       // Check if the response contains the expected data
       if (res && res.data && res.data.masterLink && res.data.masterLink.link) {
         setLink(res.data.masterLink.link);
       } else {
         // Handle the case where the master link is not found
         console.error("Master link could not be found");
         // Optionally, set an error state or show a message to the user
       }
    } catch (error: any) {
       if (error.response && error.response.data) {
         console.error("Error fetching master link:", error.response.data.message);
       } else {
         console.error("Error fetching master link:", error.message);
       }
       // Optionally, set an error state or show a message to the user
    }
   }
   

  async function addMasterLink() {
    await API_CALL.addMasterLink({ ...getSportFromSession(), link })
  }

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined = (e) => {
    setLink(e.target.value)
  }

  useEffect(() => {
    getMasterLink()
  }, []);

  return (
    <Box component="div">
      <PageHeader title="Dashboard" />
      <Paper
        sx={{
          width: "100%",
          variant: "outlined",
          borderRadius: "14px",
          border: "0.6px solid rgba(213, 213, 213,1)",
          boxShadow: "0 0 16px 8px rgba(0, 0, 0, 0.000002)",
          padding: "18px 32px",
          height: "130px",
          display: "grid",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box width="380px">
            <AppInput
              label="Master Website Link"
              placeholder="Enter the link of the Master website of this sport here"
              onChange={handleInputChange}
              value={link}
              // value={link || "Add link"}
            />
          </Box>
          <Box>
            <Button variant="contained" onClick={addMasterLink}>Apply Now</Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default Dashboard;
