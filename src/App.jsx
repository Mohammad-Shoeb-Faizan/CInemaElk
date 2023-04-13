import { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Movie from "./components/Movie";
import AllReviews from "./components/AllReviews";
import Profile from "./components/Profile";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  

  return (
    <>
      {user && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/reviews" element={<AllReviews />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
