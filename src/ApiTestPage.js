import React, { useState } from "react";
import axios from "axios";

const API_KEY = "e151eede51858a0862be634a32f83d9c";
const MOVIE_API_URL = `https://api.themoviedb.org/3/movie/550?api_key=${API_KEY}`;

const ApiTestPage = () => {
  const [movieRecommendation, setMovieRecommendation] = useState("");

  const fetchMovieRecommendation = async () => {
    try {
      const response = await axios.get(MOVIE_API_URL);
      const movieTitle = response.data.title;
      const movieRating = response.data.vote_average;
      const moviePrice = "$15.99"; // Replace with real price from another API
      const movieReview = "Great movie!";
      const recommendation = `I recommend the movie '${movieTitle}' with a rating of ${movieRating}/10. It costs ${moviePrice}. Review: ${movieReview}`;
      setMovieRecommendation(recommendation);
    } catch (error) {
      console.error("Error fetching movie data:", error);
      setMovieRecommendation("Oops! Something went wrong while fetching movie data.");
    }
  };

  return (
    <div>
      <h2>Movie API Test</h2>
      <button onClick={fetchMovieRecommendation}>Fetch Movie Recommendation</button>
      {movieRecommendation && <p>{movieRecommendation}</p>}
    </div>
  );
};

export default ApiTestPage;
