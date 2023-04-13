import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";

const styles = {
  root: {
    display: "flex",
    maxWidth: 800,
    padding: "1.4rem",
    marginRight: "0.5rem",
    marginBottom: "0.5rem",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "50%",
    padding: "1rem",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: "50%",
    objectFit: "contain",
  },
};

export default function AllReviews() {
  const [reviews, setReviews] = useState([]);
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  useEffect(() => {
    async function fetchReviews() {
      const collectionRef = collection(db, "User-Reviews");
      const querySnapshot = await getDocs(collectionRef);
      const reviewsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(reviewsData);
    }
    fetchReviews();
  }, []);

  return (
    <div>
      <div
        style={{
          fontFamily: "Tilt Warp",
          textAlign: "center",
          marginTop: "6rem",
          fontSize: "2rem",
        }}
      >
        Reviews By Cinema Elk Users
      </div>
      <div className="allReviewsScreen">
        {reviews.map((review) => (
          <Card key={review.id} className="root" style={styles.root}>
            <div className="details" style={styles.details}>
              <CardContent className="content" style={styles.content}>
                <Typography
                  variant="h5"
                  style={{ borderBottom: "1px solid black" }}
                >
                  {review.userEmail.split("@")[0]}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {review.movie_name}
                </Typography>
                <Rating
                  variant="body2"
                  name="read-only"
                  value={review.rating}
                  readOnly
                />
                <Typography variant="body2" component="p">
                  {review.id === selectedReviewId
                    ? review.review
                    : review.review.slice(0, 100) + "..."}
                </Typography>
                {review.id === selectedReviewId ? (
                  <Button
                    variant="contained"
                    onClick={() => setSelectedReviewId(null)}
                  >
                    Read less
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => setSelectedReviewId(review.id)}
                  >
                    Read more
                  </Button>
                )}
              </CardContent>
            </div>
            <CardMedia
              className="cover"
              style={styles.cover}
              image={`https://image.tmdb.org/t/p/w500${review.image}`}
              title={review.movie_name}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}
