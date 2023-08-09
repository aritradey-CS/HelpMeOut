import React, { useState } from "react";
import axios from "axios";

const API_KEY = "e151eede51858a0862be634a32f83d9c";
const MOVIE_API_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=1`;

const ApiTestPage = () => {
  const [movieRecommendations, setMovieRecommendations] = useState([]);

  const fetchMovieRecommendations = async () => {
    try {
      const response = await axios.get(MOVIE_API_URL);
      const movies = response.data.results;

      const recommendations = movies.slice(0, 10).map((movie) => {
        const movieTitle = movie.title;
        const movieRating = movie.vote_average;
        const moviePoster = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        const movieLink = `https://www.themoviedb.org/movie/${movie.id}`;

        return {
          title: movieTitle,
          rating: movieRating,
          poster: moviePoster,
          link: movieLink,
        };
      });

      setMovieRecommendations(recommendations);
    } catch (error) {
      console.error("Error fetching movie data:", error);
      setMovieRecommendations([
        { title: "Oops! Something went wrong while fetching movie data." },
      ]);
    }
  };

  return (
    <div>
      <h2>Movie API Test</h2>
      <button onClick={fetchMovieRecommendations}>
        Fetch Movie Recommendations
      </button>
      {movieRecommendations.length > 0 && (
        <div>
          <h3>Movie Recommendations:</h3>
          <ul>
            {movieRecommendations.map((movie, index) => (
              <li key={index}>
                <a href={movie.link} target="_blank" rel="noopener noreferrer">
                  <img src={movie.poster} alt={movie.title} width="100" />
                  {movie.title} (Rating: {movie.rating})
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ApiTestPage;
