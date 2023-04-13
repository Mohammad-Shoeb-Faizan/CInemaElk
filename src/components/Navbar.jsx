import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Elk from "../assets/elk.png";
import { auth } from "../firebase";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import VideoLibraryRoundedIcon from "@mui/icons-material/VideoLibraryRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  let navigate = useNavigate();
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <div>
      <div className="navbar-container-top">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed">
            <Toolbar variant="dense">
              <img
                src={Elk}
                style={{ height: 70, marginRight: 30 }}
                onClick={() => navigate("/home")}
              />
              <Typography
                onClick={() => navigate("/home")}
                style={{ fontFamily: "Rubik Marker Hatch", fontSize: "1.6rem" }}
                variant="h6"
                color="inherit"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                CINEMA ELK
              </Typography>
              <Button color="inherit" onClick={() => handleLogout()}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
      <div className="navbar-container-left">
        <div className="navbar">
          <div className="navbar__item" onClick={() => navigate("/home")}>
            <HomeRoundedIcon />
            <p>Home</p>
          </div>
          <div className="navbar__item" onClick={() => navigate("/reviews")}>
            <VideoLibraryRoundedIcon />
            <p>
              Movie <br /> Reviews
            </p>
          </div>
          <div className="navbar__item" onClick={() => navigate("/profile")}>
            <AccountCircleRoundedIcon />
            <p>Profile</p>
          </div>
        </div>
      </div>
    </div>
  );
}
