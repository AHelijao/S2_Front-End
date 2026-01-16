export const userRequests = {
  login: '/users/login',
  logout: '/users/logout',
  register: '/users/register'
}

export const movieRequests = {
  fetchAllMovies: '/movies',
  fetchNetflixOriginals: '/movies?category=Netflix Originals',
}

export const addMovie = '/movies';
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
