import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { db } from "../firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import axios from "axios";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Movie = () => {
  const location = useLocation();
  const { title, overview, poster_path } = location.state;
  const movieid = location.state.id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const [getReview, setGetReview] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);

  const IMAGE_API = "https://image.tmdb.org/t/p/w500/";
  const SIMILAR_API = `https://api.themoviedb.org/3/movie/${movieid}/similar?api_key=cb390091f1e2835553da41fa333cf620&language=en-US&page=1`;
  const CASTANDCREW_API = `https://api.themoviedb.org/3/movie/${movieid}/credits?api_key=cb390091f1e2835553da41fa333cf620`;

  const auth = getAuth();
  const user = auth.currentUser;
  async function addReviewData() {
    const collectionRef = collection(db, "User-Reviews");
    await addDoc(collectionRef, {
      userEmail: user.email,
      movie_name: title,
      review: review,
      rating: rating,
      image: poster_path,
    })
      .then(() => {
        console.log("document ID :");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    axios.get(CASTANDCREW_API).then((Response) => {
      console.log(Response.data);
      setCast(Response.data.cast);
      setCrew(Response.data.crew);
    });
  }, []);

  useEffect(() => {
    axios.get(SIMILAR_API).then((Response) => {
      console.log(Response.data.results);
      setSimilarMovies(Response.data.results);
    });
  }, []);

  useEffect(() => {
    async function getReviewData() {
      const q = query(
        collection(db, "User-Reviews"),
        where("movie_name", "==", title)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setGetReview((prevReviews) => [...prevReviews, doc.data()]);
      });
    }
    getReviewData();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="moviejsx" style={{ padding: "4rem" }}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ padding: 31, display: "flex" }}>
          <div style={{ width: "40%", borderRight: "2px solid black" }}>
            <img
              src={IMAGE_API + poster_path}
              style={{
                borderRadius: 8,
                height: 500,
                width: 500,
              }}
            />
            <h2>{title}</h2>
            <div style={{ fontFamily: "Teko", fontSize: "1.5rem" }}>
              <h3>Movie Overview :</h3> {overview}
            </div>
            <div>
              <Button
                onClick={handleOpen}
                variant="contained"
                endIcon={<SendIcon />}
              >
                Post Review
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <TextField
                    style={{ width: "100%" }}
                    id="outlined-multiline-static"
                    label="Review"
                    multiline
                    rows={4}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write your Review here!"
                  />
                  <br /> <br />
                  <h3
                    style={{
                      margin: 0,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    Rate Us :
                  </h3>{" "}
                  <br />
                  <Rating
                    onChange={(e) => setRating(e.target.value)}
                    style={{
                      width: "100%",
                    }}
                    name="size-large"
                    defaultValue={2}
                    size="large"
                  />
                  <br /> <br />
                  <Button
                    onClick={() => {
                      addReviewData(), handleClose();
                    }}
                    fullWidth
                    variant="contained"
                  >
                    Submit
                  </Button>
                </Box>
              </Modal>
            </div>
            <div>
              <h2>Cast & Crew</h2>
              <div
                className="scrollable"
                style={{
                  display: "flex",
                  width: "90%",
                  overflow: "auto",
                  height: "22vh",
                }}
              >
                {cast.map((member) => (
                  <div style={{ marginRight: "1rem" }} key={member.id}>
                    <img
                      style={{ height: "100px", borderRadius: "50%" }}
                      src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                      alt={member.name}
                    />
                    <br />
                    <span>{member.name}</span>
                  </div>
                ))}
              </div>
              <div
                className="scrollable"
                style={{
                  display: "flex",
                  width: "90%",
                  overflow: "auto",
                  height: "29vh",
                  marginTop: 20,
                }}
              >
                {crew.map((member) => (
                  <div style={{ marginRight: "1.5rem" }} key={member.id}>
                    <img
                      style={{ height: "100px", borderRadius: "50%" }}
                      src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                      alt={member.name}
                    />
                    <br />
                    <span>
                      {member.name} ({member.job})
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ width: "100%", padding: "0 3rem" }}>
              <h2>Similar Movies:</h2>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {similarMovies.map((movie) => (
                  <div
                    key={movie.id}
                    style={{ margin: "1rem", cursor: "pointer", width: "40%" }}
                    onClick={() =>
                      navigate(`/movie/${movie.id}`, {
                        state: {
                          title: movie.original_title,
                          overview: movie.overview,
                          poster_path: movie.poster_path,
                          id: movie.id,
                        },
                      })
                    }
                  >
                    <img
                      src={IMAGE_API + movie.poster_path}
                      style={{
                        borderRadius: 8,
                        height: 200,
                        width: 150,
                      }}
                    />
                    <p>{movie.original_title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ width: "60%", padding: 30 }}>
            <h2 style={{ fontFamily: "Teko", textAlign: "center" }}>
              Reviews By Cinema Elk Users
            </h2>
            <div style={{ width: "100%", padding: 30 }}>
              {getReview.map((review) => (
                <Box
                  key={review.id}
                  sx={{
                    p: 2,
                    border: "1px solid gray",
                    borderRadius: "4px",
                    margin: "1rem 0",
                  }}
                >
                  <Typography
                    style={{ borderBottom: "1px solid black" }}
                    variant="body1"
                    sx={{ margin: "0.5rem 0" }}
                  >
                    {review.review}
                  </Typography>
                  <Typography
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    variant="h6"
                  >
                    {review.userEmail.split("@")[0]}
                    <Rating
                      style={{ display: "flex" }}
                      name="read-only"
                      value={review.rating}
                      readOnly
                    />
                  </Typography>
                </Box>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;
