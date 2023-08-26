import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import axios from "axios";
import MovieRecommendation from "./components/MovieRecommendation";
import BookRecommendation from "./components/BookRecommendation";
import MusicRecommendation from "./components/MusicRecommendation";
import ClothesRecommendation from "./components/ClothesRecommendation";

const API_KEY = "e151eede51858a0862be634a32f83d9c";
const MOVIE_API_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=1`;

// Define your book, music, and clothes API URLs here
const BOOK_API_URL = "";
const MUSIC_API_URL = "";
const CLOTHES_API_URL = "";

function App() {
  const [userInput, setUserInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    addChatMessage("Chatbot", "Hello! How can I assist you today?");
    scrollToBottom(); // Scroll to the bottom on initial load
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const addChatMessage = (sender, message) => {
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { sender, text: message },
    ]);
  };

  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      const chatMessagesContainer = chatMessagesRef.current;
      chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }
  };

  const generateResponse = async (userInput) => {
    try {
      if (userInput.toLowerCase().includes("movie")) {
        getMovieRecommendation();
        return "Sure! Here are some movie recommendations:";
      } else if (userInput.toLowerCase().includes("book")) {
        // Handle book recommendations
      } else if (userInput.toLowerCase().includes("music")) {
        // Handle music recommendations
      } else if (userInput.toLowerCase().includes("clothes")) {
        // Handle clothes recommendations
      } else {
        return "I'm sorry, I can't help you with that at the moment.";
      }
    } catch (error) {
      console.error("Error generating response:", error);
      return "Oops! Something went wrong.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setIsTyping(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const response = await generateResponse(userInput);

    setIsTyping(false);

    addChatMessage("User", userInput);
    addChatMessage("Chatbot", response);

    setUserInput("");
    scrollToBottom();
  };

  const getMovieRecommendation = async () => {
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

      addChatMessage(
        "Chatbot",
        <MovieRecommendation recommendations={recommendations} />
      );
    } catch (error) {
      console.error("Error fetching movie data:", error);
      addChatMessage(
        "Chatbot",
        "Oops! Something went wrong while fetching movie data."
      );
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">HelpMeOut</div>
      <div className="chatbox">
        <div className="chatbox-messages" ref={chatMessagesRef}>
          <div className="suggestions">
            <button onClick={getMovieRecommendation}>
              Movie Recommendations
            </button>
            {/* <button onClick={() => handleBookSearch()}>Book Recommendations</button> */}
            {/* <button onClick={() => handleMusicSearch()}>Music Recommendations</button> */}
            {/* <button onClick={() => handleClothesSearch()}>Clothes Recommendations</button> */}
          </div>

          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${message.sender.toLowerCase()}-message`}
            >
              {message.text}
            </div>
          ))}
          {isTyping && (
            <div className="chat-message chatbot-message typing">
              Chatbot is typing...
            </div>
          )}
        </div>
        <form className="chatbox-input" onSubmit={handleSubmit}>
          <input
            className="text-box"
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
