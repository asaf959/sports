import { Avatar, Box, Grid, Paper } from "@mui/material";
import PageHeader from "../../../components/header";
import { Button } from "../../../components/button";
import AppInput from "../../../components/newInput";

function EditUsers() {
  return (
    <Box component="div">
      <PageHeader title="Edit User" />
      <Paper variant="outlined" sx={{ borderRadius: "16px" }}>
        <Box
          sx={{
            padding: "60px 176px", // top and bottom padding: 60px, left and right padding: 176px
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box sx={{ maxWidth: "780px" }}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: "60px",
              }}
            >
              <Avatar
                sx={{
                  height: 80,
                  width: 80,
                  fontSize: 32,
                  bgcolor: "rgba(72, 128, 255, 0.15)",
                  color: "#000",
                  fontWeight: 600,
                }}
              >
                K L
              </Avatar>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6} sx={{ marginBottom: "30px" }}>
                <AppInput label="Name" placeholder="John doe" />
              </Grid>
              <Grid item xs={6} sx={{ marginBottom: "30px" }}>
                <AppInput label="Username" placeholder="John_do_00142" />
              </Grid>
              <Grid item xs={6}>
                <AppInput
                  label="Password"
                  type="password"
                  placeholder="********"
                />
              </Grid>
              <Grid item xs={6}>
                <AppInput
                  label="Confirm password"
                  type={"password"}
                  placeholder="******"
                />
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
              >
                Save Changes
              </Button>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default EditUsers;
