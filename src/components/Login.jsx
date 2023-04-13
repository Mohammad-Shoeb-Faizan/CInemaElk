import { Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Elk from "../assets/elk.png";
import SubmitArrow from "../assets/arrow.png";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
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
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setIsLoggedIn(true);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div
      className="loginScreen"
      style={{
        height: "99vh",
        width: "99vw",
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
            <Box component="div" sx={{ mt: 1 }}>
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
                Login Now{" "}
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
              Join the club,{" "}
              <a onClick={() => navigate("/register")}>Click here</a>
            </h3>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
