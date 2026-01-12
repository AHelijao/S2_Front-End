import React, { useState } from "react";
import "../styles/Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { useNavigate } from "react-router-dom";

const Row = ({ title, movies, isLarge }) => {
  const [movie, setMovie] = useState({});
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleMovieClick = (event, movie) => {
    event.preventDefault();
    setMovie(movie);

    if (trailerUrl) {
      setTrailerUrl("");
    }

    setShowModal(!showModal);
  };

  const handleViewClick = (event) => {
    event.preventDefault();
    navigate(`/movie/${movie.movie_id}`, { state: { movie } });
  };

  const handlePlayClick = (event) => {
    event.preventDefault();

    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          console.log(urlParams);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies === undefined || movies.length === 0 ? (
          <span>No Movies Foudn</span>
        ) : (
          movies.map((movie) => (
            <img
              key={movie.movie_id}
              className={`row_poster ${isLarge && "row_posterLarger"}`}
              src={isLarge ? movie.poster : movie.backdrop_poster}
              alt={movie.title}
              onClick={(event) => handleMovieClick(event, movie)}
            />
          ))
        )}
      </div>
      {trailerUrl && (
        <YouTube
          videoId={trailerUrl}
          opts={{
            height: "400",
            width: "100%",
            playerVars: {
              autoplay: 1,
            },
          }}
        />
      )}
      {showModal && (
        <div className="movie_options">
          <button
            className="movie_button"
            onClick={(event) => handlePlayClick(event)}
          >
            Play
          </button>
          <button
            className="movie_button"
            onClick={(event) => handleViewClick(event)}
          >
            View
          </button>
        </div>
      )}
    </div>
  );
};

export default Row;
