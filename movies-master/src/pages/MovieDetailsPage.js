import React from 'react'
import { useParams } from 'react-router-dom'
import useFetchData from '../hooks/useFetchData'

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie] = useFetchData(`/movies/${movieId}`);

  return (
    <div>
      {movie.title}
    </div>
  )
}

export default MovieDetailsPage
