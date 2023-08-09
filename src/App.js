import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import axios from "axios";

const API_KEY = "e151eede51858a0862be634a32f83d9c";

function App() {
  const [userInput, setUserInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    addChatMessage("Chatbot", "Hello! How can I assist you today?");
    scrollToBottom(); //this line to scroll to the bottom on initial load
  }, []);

  useEffect(() => {
    // Call the scrollToBottom function whenever chatMessages state updates
    scrollToBottom();
  }, [chatMessages]); // Add chatMessages as a dependency

  const addChatMessage = (sender, message) => {
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { sender, text: message },
    ]);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const generateResponse = async (userInput) => {
    try {
      // Implement your decision tree logic here
      // For example, you can check if user input contains keywords related to movies, books, etc.
      if (userInput.toLowerCase().includes("movie")) {
        return await getMovieRecommendation();
      } else if (userInput.toLowerCase().includes("book")) {
        return await getBookRecommendation();
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

    // Simulate API call delay for 1.5 seconds
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate response based on user input
    const response = await generateResponse(userInput);

    setIsTyping(false);

    addChatMessage("User", userInput);
    addChatMessage("Chatbot", response);

    setUserInput("");
    scrollToBottom(); // Call the scrollToBottom function
  };

  const getMovieRecommendation = async () => {
    try {
      // Simulate API request using axios (replace with actual API call)
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/550?api_key=${API_KEY}`
      );
      // Parse the API response and extract movie details
      const movieTitle = response.data.title;
      const movieRating = response.data.vote_average;
      const moviePrice = "$15.99"; // You can fetch real price from another API
      const movieReview = "Great movie!";
      return `I recommend the movie '${movieTitle}' with a rating of ${movieRating}/10. It costs ${moviePrice}. Review: ${movieReview}`;
    } catch (error) {
      console.error("Error fetching movie data:", error);
      return "Oops! Something went wrong while fetching movie data.";
    }
  };

  const getBookRecommendation = async () => {
    try {
      // Simulate fetching book details (replace with actual API call)
      const bookTitle = "Book Title";
      const bookRating = "4.7/5";
      const bookPrice = "$12.50";
      const bookReview = "Highly recommended!";
      return `I recommend the book '${bookTitle}' with a rating of ${bookRating}. It costs ${bookPrice}. Review: ${bookReview}`;
    } catch (error) {
      console.error("Error fetching book data:", error);
      return "Oops! Something went wrong while fetching book data.";
    }
  };

  // Function to handle auto-scrolling
  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      const chatMessagesContainer = chatMessagesRef.current;
      chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">HelpMeOut</div>
      <div className="chatbox">
        <div className="chatbox-messages" ref={chatMessagesRef}>
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
            onChange={handleInputChange}
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
