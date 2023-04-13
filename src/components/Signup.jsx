import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Elk from "../assets/elk.png";
import SubmitArrow from "../assets/arrow.png";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return unsubscribe;
  }, []);

  async function handleLogin() {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      navigate("/", {
        state: {
          message:
            "You have successfully created an account. Please log in to continue.",
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  if (isLoggedIn) {
    navigate("/home");
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "#f15a24",
        overflow: "hidden",
      }}
    >
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <div style={{ padding: "6rem" }}>
            <img src={Elk} style={{ height: "40rem" }} />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div
            style={{
              padding: "15rem 7rem 0 8rem",
            }}
          >
            <h2
              style={{
                fontFamily: "Rubik Marker Hatch",
                fontSize: "3rem",
                display: "flex",
                justifyContent: "center",
                color: "white",
              }}
            >
              CINEMA ELK
            </h2>
            <Box component="form" sx={{ mt: 1 }}>
              <TextField
                onChange={(e) => setEmail(e.currentTarget.value)}
                style={{
                  marginRight: "3rem",
                  background: "white",
                  borderRadius: "10px",
                }}
                required
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />

              <TextField
                onChange={(e) => setPassword(e.currentTarget.value)}
                style={{ background: "white", borderRadius: "10px" }}
                required
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <br />
              <TextField
                style={{
                  background: "white",
                  borderRadius: "10px",
                  margin: "1rem 0 0 0",
                }}
                required
                fullWidth
                name="name"
                label="Enter Full Name"
                type="text"
                autoComplete="current-password"
              />
              <br />
              <Button
                onClick={handleLogin}
                type="submit"
                sx={{ mt: 3, mb: 2 }}
                style={{
                  width: "85%",
                  marginLeft: "2rem",
                  marginBottom: "2rem",
                  background: "#f15a24",
                  border: "2px solid white",
                  color: "white",
                }}
              >
                Join the club{" "}
                <img
                  style={{ height: "2rem", width: "4rem", marginLeft: "2rem" }}
                  src={SubmitArrow}
                />
              </Button>
              <Grid container></Grid>
            </Box>
            <h3
              style={{
                display: "flex",
                justifyContent: "center",
                color: "white",
              }}
            >
              Already a member? <a onClick={() => navigate("/")}>Click here</a>
            </h3>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
