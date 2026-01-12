import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { movieApi } from "../constants/axios";
import { movieRequests } from "../constants/requests";

const initialState = {
  movies: {
    Trending: [],
    Comedy: [],
    Horror: [],
    Documentaries: [],
    "Netflix Originals": [],
    Romance: [],
    "Top Rated": [],
  },
  status: "idle",
  error: null,
};

export const getMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const token = user?.token;

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await movieApi.get(movieRequests.fetchAllMovies, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

const movieSlice = createSlice({
  name: "movies",
  initialState,
  // add reducers for the sync on the UI
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovies.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getMovies.fulfilled, (state, action) => {
      state.movies = action.payload.movies;
      state.status = "success";
    });
    builder.addCase(getMovies.rejected, (state, action) => {
      state.error = action.error.message;
      state.status = "failed";
    });
  },
});

export default movieSlice.reducer;

export const selectAllMovies = (state) => state.movies.movies;
export const selectMoviesStatus = (state) => state.movies.status;
export const selectErrors = (state) => state.movies.error;
