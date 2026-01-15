const Movie = require("../models/movieModel");
const { queryError, success, badRequest, missingParameters } = require("../constants/statusCodes");
const logger = require("../middleware/winston");
// const uploadFile = require("../upload/uploadFile"); // Commented as upload logic needs update for Mongo or specific implementation

const addMovie = async (req, res) => {
  const { title, release_date, author, type, poster, backdrop_poster, overview } = req.body;

  if (!title || !release_date || !author || !type) {
    return res
      .status(400) // Assuming missingParameters is 400
      .json({ message: "missing parameters" });
  }

  try {
    const newMovie = new Movie({
      title,
      release_date,
      author,
      type,
      poster,
      backdrop_poster,
      overview,
      creation_date: req.body.creation_date,
    });

    const savedMovie = await newMovie.save();
    logger.info(savedMovie);
    res.status(200).json({ message: "Movie added", movie: savedMovie }); // Assuming success is 200
  } catch (err) {
    logger.error(err.stack);
    res
      .status(500) // Assuming queryError is 500
      .json({ error: "Exception occured while adding new movie" });
  }
};

const getMovieById = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    logger.info("MOVIE", movie);
    res.status(200).json({ movie: [movie] }); // Returning array to match previous structure
  } catch (err) {
    logger.error(err.stack);
    res
      .status(500)
      .json({ error: "Exception occured while fetching movie" });
  }
};

const getMovieByCategory = async (req, res) => {
  const { category } = req.query;

  try {
    const movies = await Movie.find({ type: category });
    logger.info("MOVIES", movies);
    res.status(200).json({ movies });
  } catch (err) {
    logger.error(err.stack);
    res
      .status(500)
      .json({ error: "Exception occured while fetching movie" });
  }
};

const getMovies = async (req, res) => {
  const { category } = req.query;
  if (category) {
    return getMovieByCategory(req, res);
  }

  try {
    const movies = await Movie.find({});

    const groupedMovies = movies.reduce((acc, movie) => {
      const { type } = movie;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(movie);
      return acc;
    }, {});

    res.status(200).json({ movies: groupedMovies });
  } catch (err) {
    logger.error(err.stack);
    res
      .status(500)
      .json({ error: "Exception occured while fetching movies" });
  }
};

const uploadImage = async (req, res) => {
  // Disabling upload for now as it relied on SQL and specific file handling
  // If needed, it should update the document using findByIdAndUpdate
  return res.status(501).json({ message: "Upload not implemented for Mongo yet" });
};

module.exports = {
  addMovie,
  getMovieById,
  getMovies,
  uploadImage,
  getMovieByCategory,
};
