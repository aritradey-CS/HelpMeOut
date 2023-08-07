import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [userInput, setUserInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setIsTyping(true);

    // Simulate API call delay for 1.5 seconds
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate API response with movie recommendations
    const movieRecommendation = await getMovieRecommendation(userInput);

    setIsTyping(false);

    setChatMessages((prevMessages) => [
      ...prevMessages,
      { sender: "User", text: userInput },
      { sender: "Chatbot", text: movieRecommendation },
    ]);

    setUserInput("");
  };

  const getMovieRecommendation = async (userInput) => {
    // Simulate API request using axios (replace with actual API call)
    const apiKey = "your_api_key";
    const url = `https://api.themoviedb.org/3/movie/550?api_key=${apiKey}`;
    try {
      const response = await axios.get(url);
      // Parse the API response and extract movie recommendation
      const movieTitle = response.data.title;
      const movieRating = response.data.vote_average;
      return `I recommend the movie "${movieTitle}" with a rating of ${movieRating}/10.`;
    } catch (error) {
      console.error("Error fetching movie data:", error);
      return "Oops! Something went wrong.";
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">HelpMeOut</div>
      <div className="chatbox">
        <div className="chatbox-messages">
          {chatMessages.map((message, index) => (
            <div key={index} className={`chat-message ${message.sender.toLowerCase()}-message`}>
              {message.text}
            </div>
          ))}
          {isTyping && <div className="chat-message chatbot-message typing">Chatbot is typing...</div>}
        </div>
        <form className="chatbox-input" onSubmit={handleSubmit}>
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;
