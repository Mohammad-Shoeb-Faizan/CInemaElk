import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

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
  },
};

export default function Profile() {
  const auth = getAuth();
  const [reviews, setReviews] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
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

  async function handleCurrentUsersData() {
    const collectionRef = collection(db, "User-Reviews");
    const q = query(
      collectionRef,
      where("userEmail", "==", auth.currentUser.email)
    );

    const querySnapshot = await getDocs(q);
    const reviewsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setReviews(reviewsData);
  }

  handleCurrentUsersData();

  async function handleDeleteReview(id) {
    await deleteDoc(doc(db, "User-Reviews", id));
  }

  async function updateReviewData(id) {
    const collectionRef = collection(db, "User-Reviews");
    const docRef = doc(collectionRef, id);

    await updateDoc(docRef, {
      review: review,
      rating: rating,
    })
      .then(() => {
        console.log("Document updated successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
        Reviews By {auth.currentUser.email.split("@")[0]}
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
                <EditIcon
                  onClick={handleOpen}
                  style={{ marginRight: "1.5rem" }}
                />
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
                      defaultValue={review.review}
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
                      defaultValue={review.rating}
                      size="large"
                    />
                    <br /> <br />
                    <Button
                      onClick={() => {
                        updateReviewData(review.id), handleClose();
                      }}
                      fullWidth
                      variant="contained"
                    >
                      Submit
                    </Button>
                  </Box>
                </Modal>
                <DeleteForeverIcon
                  onClick={() => handleDeleteReview(review.id)}
                />
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
