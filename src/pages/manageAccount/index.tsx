import { Avatar, Box, Grid, Paper } from "@mui/material";
import PageHeader from "../../components/header";
import { Button } from "../../components/button";
import AppInput from "../../components/newInput";
import { getCurrentUser } from "../../utils/session";
import { useEffect, useState } from "react";
import API_CALL from "../../services";
import { manageAccountPath } from "../../router/path";
import { redirect } from "react-router-dom";


function ManageAccount() {
  // const user = getCurrentUser();
  // console.log(user.name)    
  const [user, setUser] = useState({ name: '', email: '', password: '', passwordConfirm: '' });
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);

 useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser({ name: currentUser.name, email: currentUser.email, password: '', passwordConfirm: '' });
    }
 }, []);
const handleSubmit : React.FormEventHandler<HTMLFormElement> = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);
  try {
    const data = await API_CALL.updateMe(user);
    return redirect(manageAccountPath)
    // Handle success, e.g., show a success message or redirect
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any ) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <Box component="div">
      <PageHeader title="Manage Account" />
      <Paper variant="outlined" sx={{ borderRadius: "16px" }}>
        <Box
          sx={{
            padding: "60px 176px", // top and bottom padding: 60px, left and right padding: 176px
            display: "flex",
            justifyContent: "center",
          }}
        >
          <form onSubmit={handleSubmit} sx={{ maxWidth: "780px" } as any}>
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
                <AppInput label="Name" value={user.name} />
              </Grid>
              <Grid item xs={6} sx={{ marginBottom: "30px" }}>
                <AppInput label="Email" value={user.email} />
              </Grid>
              <Grid item xs={6}>
                <AppInput label="password" type="password" placeholder="******"/>
              </Grid>
              <Grid item xs={6}>
                <AppInput label="Confirm password" type="password" placeholder="******"/>
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
                type="submit"
                disabled={loading}
              >
                Save Changes
              </Button>
            </Grid>
          </form>
        </Box>
      </Paper>
    </Box>
  );
}

export default ManageAccount;
