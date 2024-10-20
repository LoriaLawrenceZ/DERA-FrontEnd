import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header/Header";

function App() {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");

    const handleSendMessage = async () => {
        if (userInput.trim() === "") return;

        const userMessage = { role: "user", text: userInput };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setUserInput("");

        const derMessage = { role: "der", text: "Analisando..." };
        setMessages((prevMessages) => [...prevMessages, derMessage]);

        // API OpenAI
        const derResponse = await fetch("https://dera-backend-p600epkej-lorialawrencezs-projects.vercel.app/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({msg: userMessage})
        })
        setMessages((prevMessages) =>
            prevMessages.map((msg, index) =>
                index === prevMessages.length - 1
                    ? { ...msg, text: derResponse.replace(/\n/g, "<br>") }
                    : msg,
            ),
        );
    };

    const scrollToRecentMessages = () => {
        const chatContainer = document.getElementById("chat-messages-container");
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToRecentMessages();
    }, [messages]);

    const handleKeyUp = (event) => {
        if (event.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <div className="page">
            <Header />

            <article className="chatbot-container">
                <section
                    className="chat-messages-container"
                    id="chat-messages-container"
                >
                    <div className="messages-container">
                        <p className="message der-message">Sou o Der</p>
                        {messages.map((msg, index) => (
                            <p
                                key={index}
                                className={`message ${msg.role == "user" ? "user-message" : "der-message"}`}
                                dangerouslySetInnerHTML={{ __html: msg.text }}
                            ></p>
                        ))}
                    </div>
                </section>

                <section className="input-container">
                    <textarea
                        type="text"
                        name="user-input"
                        className="user-input"
                        id="user-input"
                        placeholder="Fala com o DER aí"
                        autoFocus={true}
                        value={userInput}
                        onChange={(event) => setUserInput(event.target.value)}
                        onKeyUp={handleKeyUp}
                    />

                    <button type="submit" id="user-input-btn" onClick={handleSendMessage}>
                        &gt;
                    </button>
                </section>
            </article>
        </div>
    );
}

export default App;
