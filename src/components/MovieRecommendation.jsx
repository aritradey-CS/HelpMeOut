import React from "react";


const API_KEY = "e151eede51858a0862be634a32f83d9c";
const MOVIE_API_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=1`;

const MovieRecommendation = ({ recommendations }) => {
  return (
    <div className="recommendation-section">
      <h3>Movie Recommendations:</h3>
      <ul>
        {recommendations.map((movie, index) => (
          <li key={index}>
            <a href={movie.link} target="_blank" rel="noopener noreferrer">
              <img src={movie.poster} alt={movie.title} width="100" />
              {movie.title} (Rating: {movie.rating})
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieRecommendation;
