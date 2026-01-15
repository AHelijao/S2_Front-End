import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import { movieApi } from "../constants/axios";
import { movieRequests } from "../constants/requests";
import useAppStateContext from "../hooks/useAppStateContext";
import Row from "../components/Row";
import { useDispatch, useSelector } from "react-redux";
import {
  getMovies,
  selectAllMovies,
  selectMoviesStatus,
} from "../slices/movieSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectMoviesStatus);
  const movies = useSelector(selectAllMovies);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getMovies());
    }
  });

  return (
    <div
      className="page"
      style={{ backgroundColor: "var(--bg-color)", overflow: "hidden" }}
    >
      <Navbar />
      <Banner />
      {Object.keys(movies).map((title) => (
        <Row key={title} title={title} movies={movies[title]} isLoading={status === "loading"} />
      ))}
    </div>
  );
};

export default HomePage;
