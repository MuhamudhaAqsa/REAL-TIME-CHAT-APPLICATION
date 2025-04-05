import { useState, useEffect, useRef } from "react";

export default function ChatApp() {
  // State to hold all chat messages
  const [messages, setMessages] = useState([]);
  // State to manage current input value
  const [input, setInput] = useState("");
  // Ref to scroll to the latest message
  const messagesEndRef = useRef(null);

  // Sends the message and updates the state
  const sendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "You" }]);
      setInput(""); // Clear input after sending
    }
  };

  // Handles Enter key to send message
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // Scroll to bottom whenever a new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              backgroundColor: msg.sender === "You" ? "#cce5ff" : "#f1f1f1",
              alignSelf: msg.sender === "You" ? "flex-end" : "flex-start",
            }}
          >
            {msg.text}
          </div>
        ))}
        {/* Scroll target div to keep the latest message in view */}
        <div ref={messagesEndRef} />
      </div>
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
        />
        <button style={styles.button} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

// Inline styles for the chat app
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "400px",
    height: "100vh",
    margin: "auto",
    padding: "16px",

    // Added border to the overall chat container
    border: "2px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#ffffff", // Makes the chat stand out
  },
  chatBox: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    paddingBottom: "10px",
  },
  message: {
    padding: "10px",
    borderRadius: "8px",
    maxWidth: "70%",
    wordWrap: "break-word",
  },
  inputContainer: {
    display: "flex",
    gap: "8px",
    marginTop: "10px",
  },
  input: {
    flex: 1,
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "8px 12px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
