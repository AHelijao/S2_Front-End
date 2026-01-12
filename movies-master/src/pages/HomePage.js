import React, { useEffect } from "react";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import Row from "../components/Row";
import { useDispatch, useSelector } from "react-redux";
import {
  getMovies,
  selectAllMovies,
  selectMoviesStatus,
} from "../slices/movieSlice";
import Skeleton from "../components/Skeleton";

const SkeletonItems = Array.from({ length: 10 });

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
      style={{ backgroundColor: "#111", overflow: "hidden" }}
    >
      <Navbar />
      <Banner />
      {SkeletonItems.map((item) => (
        <Skeleton key={item} />
      ))}
    </div>
  );
};



export default HomePage;
