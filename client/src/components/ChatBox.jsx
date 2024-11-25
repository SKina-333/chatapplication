import React, { useEffect, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

import { useSocketContext } from "../contexts/socketContext";

export default function ChatBox() {
  const { currentRoom, messagesByRoom, sendMessage, userName } =
    useSocketContext();

  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (input != "" && e.key === "Enter") {
      handleSendMessage(); // Send message when pressing Enter
    }
  };

  useEffect(() => {
    // Ensure the chat scrolls to the bottom whenever messagesByRoom changes
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messagesByRoom]);

  return (
    <div className="bg-white rounded-xl shadow-lg w-full md:p-5 md:col-start-3 md:col-span-3 flex flex-col">
      ChatBox - {currentRoom}
      <div className="grow border-solid border-black border-2  h-96 flex flex-col justify-end">
        <div id="chat-container" className="overflow-y-scroll p-2">
          {messagesByRoom.length > 0 ? (
            messagesByRoom.map((msg) => (
              <div
                key={msg.created_at}
                className={`mb-2 flex ${
                  msg.Users.username === userName.sender
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg shadow-sm ${
                    msg.Users.username === userName.sender
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  <span className="font-bold">{msg.Users.username}</span>:{" "}
                  {msg.text}
                </div>
              </div>
            ))
          ) : (
            <p>No messages yet...</p>
          )}
        </div>
      </div>
      <div className="flex flex-row items-center gap-2">
        <div className="grow">
          <input
            id="message"
            name="message"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6"
          />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault;
            handleSendMessage();
          }}
          className="bg-blue-500 rounded-full p-2 hover:bg-blue-600 transition"
        >
          <PaperAirplaneIcon className="size-6 text-white" />
        </button>
      </div>
    </div>
  );
}
