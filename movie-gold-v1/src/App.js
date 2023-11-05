import "./App.css";
import api from "./api/axiosConfig";
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import { Routes, Route, HashRouter } from "react-router-dom";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Trailer from "./components/trailer/Trailer";
import Reviews from "./components/reviews/Reviews";
import NotFound from "./components/header/notFound/NotFound";
import Watchlist from "./components/watchlist/Watchlist";
function App() {
  const [movies, setMovies] = useState();
  /* this useState will store the movies data from an relevant API end point */
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState();

  const getMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies/");
      console.log(response.data);
      setMovies(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(`/api/v1/movies/${movieId}`);
      const singleMovie = response.data;
      setMovie(singleMovie);
      setReviews(singleMovie.reviewIds);
    } catch (error) {
      console.log(error);
    }
  };
  // using use effect hook so that get movies function is excuted when the app component loads first
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div className="App">
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home movies={movies} />}></Route>
            <Route path="//watchlist" element={<Watchlist />}></Route>
            <Route path="/Trailer/:ytTrailerId" element={<Trailer />}></Route>
            {/* http://localhost:3000/Trailer/JaV7mmc9HGw */}
            <Route
              path="/Reviews/:movieId"
              element={
                <Reviews
                  getMovieData={getMovieData}
                  movie={movie}
                  reviews={reviews}
                  setReviews={setReviews}
                />
              }
            ></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
