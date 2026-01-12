CREATE TABLE movies (
  movie_id SERIAL PRIMARY KEY,
  title varchar(80) NOT NULL,
  release_date date NOT NULL,
  author varchar(80) NOT NULL,
  type varchar(25) NOT NULL,
  poster varchar(255),
  backdrop_poster varchar(255),
  overview varchar(500),
  CONSTRAINT unique_movie_title_release_date UNIQUE (title, release_date),
  CONSTRAINT unique_movie_id UNIQUE (movie_id)
);

CREATE TABLE users (
  email VARCHAR(255) PRIMARY KEY,
  username VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    name TEXT,
    user_email VARCHAR(255) REFERENCES users(email),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE addresses (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) REFERENCES users(email),
  city VARCHAR(255),
  street VARCHAR(255)
);

CREATE TABLE seen_movies (
  user_email VARCHAR(255) REFERENCES users(email),
  movie_id INT REFERENCES movies(movie_id),
  date_seen DATE,
  PRIMARY KEY (user_email, movie_id)
);

COPY movies (movie_id, title, release_date, author, type, poster, backdrop_poster, overview)
FROM '/docker-entrypoint-initdb.d/movie_db.csv'
DELIMITER ','
CSV;
