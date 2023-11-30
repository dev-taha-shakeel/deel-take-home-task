import { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { GlobalContext } from "../App";

interface IHeaderProps {
  logout: () => void;
}

export default function Header(props: IHeaderProps) {
  const { logout } = props;
  const globalContext = useContext(GlobalContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {globalContext.loggedInUser && globalContext.loggedInUser.id && (
            <>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Welcome{" "}
                {`${globalContext.loggedInUser.firstName} ${globalContext.loggedInUser.lastName}`}
              </Typography>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Balance: {globalContext.loggedInUser.balance}
              </Typography>

              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
