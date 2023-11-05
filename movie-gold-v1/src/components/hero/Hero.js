// hero is being the child of Home component which contains the details in the form of courosel
import React from "react";
import "./Hero.css";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
// importing paper from relevant api pacakge
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
const Hero = ({ movies }) => {
  const navigate = useNavigate();
  function reviews(movieId) {
    navigate(`/Reviews/${movieId}`);
  }
  return (
    <div className="movie-carousel-container">
      <Carousel>
        {movies?.map((movie) => {
          return (
            <Paper key={movie.imdbId}>
              <div className="movie-card-container">
                <div
                  className="movie-card"
                  style={{ "--img": `url(${movie.backdrops[3]})` }}
                >
                  <div className="movie-detail">
                    <div className="movie-poster">
                      <img src={movie.poster} alt=" movie " />
                    </div>
                    <div className="movie-title">
                      <h4>{movie.title}</h4>
                    </div>
                    <div className="movie-buttons-container">
                      <Link
                        to={`/Trailer/${movie.trailerLink.substring(
                          movie.trailerLink.length - 11
                        )}`}
                      >
                        <div className="play-button-icon-container">
                          <FontAwesomeIcon
                            className="play-button-icon"
                            icon={faCirclePlay}
                          />
                        </div>
                      </Link>
                      <div className="movie-review-button-container">
                        <Button
                          variant="info"
                          onClick={() => reviews(movie.imdbId)}
                        >
                          Reviews
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          );
        })}
      </Carousel>
      {/* for displaying movie poster and movie title */}
    </div>
  );
};

export default Hero;
