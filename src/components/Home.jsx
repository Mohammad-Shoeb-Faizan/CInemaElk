import axios from "axios";
import React, { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [nowPlayings, setNowPlayings] = useState([]);
  const [populars, setPopulars] = useState([]);
  const [topRateds, setTopRateds] = useState([]);
  const [upComings, setUpComings] = useState([]);

  let navigate = useNavigate();

  // all movie apis
  const IMAGE_API = "https://image.tmdb.org/t/p/w500/";
  const NOW_PLAYING_API = ` https://api.themoviedb.org/3/movie/now_playing?api_key=cb390091f1e2835553da41fa333cf620&language=en-US&page=5`;
  const POPULAR_API = `https://api.themoviedb.org/3/movie/popular?api_key=cb390091f1e2835553da41fa333cf620&language=en-US&page=8`;
  const TOP_RATED_API = `https://api.themoviedb.org/3/movie/top_rated?api_key=cb390091f1e2835553da41fa333cf620&language=en-US&page=3`;
  const UPCOMING_API = ` https://api.themoviedb.org/3/movie/upcoming?api_key=cb390091f1e2835553da41fa333cf620&language=en-US&page=2`;

  useEffect(() => {
    axios.get(NOW_PLAYING_API).then((Response) => {
      // console.log(Response.data.results)
      setNowPlayings(Response.data.results);
    });
  }, []);

  useEffect(() => {
    axios.get(POPULAR_API).then((Response) => {
      //  console.log(Response.data.results)
      setPopulars(Response.data.results);
    });
  }, []);

  useEffect(() => {
    axios.get(TOP_RATED_API).then((Response) => {
      //  console.log(Response.data.results)
      setTopRateds(Response.data.results);
    });
  }, []);

  useEffect(() => {
    axios.get(UPCOMING_API).then((Response) => {
      setUpComings(Response.data.results);
    });
  }, []);

  return (
    <div className="scroll">
      <div className="home-dev">
        <h1 style={{ color: "white", fontFamily: "Source Code Pro" }}>
          Now Playing
        </h1>
        <div className="nowplaying">
          {nowPlayings.map((nowPlaying) => {
            return (
              <div>
                <Card
                  onClick={() => {
                    navigate(`/movie/${nowPlaying.id}`, {
                      state: nowPlaying,
                      id: nowPlaying.id,
                    });
                  }}
                  sx={{ height: "18rem", width: "10rem", margin: "0.5rem" }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="auto"
                      image={IMAGE_API + nowPlaying.poster_path}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="p" component="div">
                        {nowPlaying.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            );
          })}
        </div>
        <h1 style={{ color: "white", fontFamily: "Source Code Pro" }}>
          POPULAR
        </h1>
        <div className="popular">
          {populars.map((popular) => {
            return (
              <div>
                <Card
                  onClick={() => {
                    navigate(`/movie/${popular.id}`, {
                      state: popular,
                      id: popular.id,
                    });
                  }}
                  sx={{ height: "18rem", width: "10rem", margin: "0.5rem" }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="auto"
                      image={IMAGE_API + popular.poster_path}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="p" component="div">
                        {popular.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            );
          })}
        </div>
        <h1 style={{ color: "white", fontFamily: "Source Code Pro" }}>
          TOP-Rated
        </h1>
        <div className="toprated">
          {topRateds.map((toprated) => {
            return (
              <div>
                <Card
                  onClick={() => {
                    navigate(`/movie/${toprated.id}`, {
                      state: toprated,
                      id: toprated.id,
                    });
                  }}
                  sx={{ height: "18rem", width: "10rem", margin: "0.5rem" }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="auto"
                      image={IMAGE_API + toprated.poster_path}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="p" component="div">
                        {toprated.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            );
          })}
        </div>
        <h1 style={{ color: "white", fontFamily: "Source Code Pro" }}>
          UpComming
        </h1>
        <div className="upcomming">
          {upComings.map((upComing) => {
            return (
              <div>
                <Card
                  onClick={() => {
                    navigate(`/movie/${upComing.id}`, {
                      state: upComing,
                      id: upComing.id,
                    });
                  }}
                  sx={{ height: "18rem", width: "10rem", margin: "0.5rem" }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="auto"
                      image={IMAGE_API + upComing.poster_path}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="p" component="div">
                        {upComing.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
