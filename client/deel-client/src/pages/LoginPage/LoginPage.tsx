import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ILoginPageProps } from "./LoginPage.interface";
import { useEffect, useState } from "react";
import { fetchProfiles } from "../../Api";
import { CLIENT_TYPE_ENUM } from "../../Api/constants";
import { IProfiles } from "../../Api/interface";

const LoginPage = (props: ILoginPageProps) => {
  const { handleLogin } = props;
  const [profiles, setProfiles] = useState<IProfiles[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<IProfiles | null>(
    null
  );

  useEffect(() => {
    async function fetchProfilesForLogin(type: CLIENT_TYPE_ENUM) {
      const profiles = await fetchProfiles(type);
      setProfiles(profiles ? profiles : []);
    }
    if (profiles.length === 0) {
      fetchProfilesForLogin(CLIENT_TYPE_ENUM.client);
    }
  }, []);

  const handleSelectChange = (
    event: SelectChangeEvent<any>,
    child: React.ReactNode
  ) => {
    console.log(child?.toString());
    const selected = profiles.find(
      (profile) => profile.id === event.target.value
    );
    setSelectedProfile(selected || null);
  };

  const renderProfileMenuItems = () =>
    profiles &&
    profiles.map((profile, index) => (
      <MenuItem value={profile.id} key={profile.id}>
        {`${profile.firstName} ${profile.lastName}`}
      </MenuItem>
    ));

  return (
    <div className="login-page">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Profiles</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedProfile?.id || ""}
              label="Profiles"
              sx={{
                width: "400px",
              }}
              onChange={handleSelectChange}
            >
              {renderProfileMenuItems()}
            </Select>

            <Button
              variant="contained"
              fullWidth
              sx={{
                marginTop: "20px",
              }}
              onClick={() => {
                if (selectedProfile) handleLogin(selectedProfile);
                else alert("Select User...");
              }}
            >
              Login
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginPage;
