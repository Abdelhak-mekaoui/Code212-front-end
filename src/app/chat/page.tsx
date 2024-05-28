"use client";
import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

interface Message {
  sender: string;
  message: string;
  time: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");

  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;

    const newMessage: Message = {
      sender: "You",
      message: inputMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage("");

    try {
      // Make API call to send message and get response
      const response = await fetch("http://localhost:8000/v1/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatQuestion: inputMessage }),
      });

      const data = await response.json();
      const botMessage: Message = {
        sender: "Bot",
        message: data.chatResponse,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Chatbot" />
      <div className="mx-auto max-w-[60rem] px-6">
        <div className=" mb-2 h-full min-h-[60vh]">
          <div className="mb-4 h-100 overflow-y-auto rounded-md border border-stroke bg-white px-7.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark ">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 rounded-md p-2 px-4 ${
                  message.sender === "You"
                    ? "self-end bg-primary text-white"
                    : "self-start bg-secondary text-white"
                }`}
              >
                <div className="m-l mb-2 text-xs">{message.sender}</div>
                <div className="text-l">{message.message}</div>
                <div className="mt-1 text-right text-xs">{message.time}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-row justify-between gap-4">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            <button
              onClick={sendMessage}
              className="inline-flex items-center justify-center rounded-md bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Chat;
