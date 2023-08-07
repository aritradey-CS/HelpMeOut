import React from "react";

const MovieRecommendation = ({ recommendation }) => {
  return (
    <div className="recommendation-section">
      <h2>Movie Recommendations</h2>
      <p>{recommendation}</p>
    </div>
  );
};

export default MovieRecommendation;
