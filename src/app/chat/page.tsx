'use client'
import React, { useState } from 'react';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MessageBubble from '@/components/Chat/MessageBubble';


const Chat = () => {
  // State to hold chat messages and user input
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');

  // Interface for a message
  interface Message {
    sender: string;
    message: string;
    time: string;
  }

  // Function to handle sending messages
  const sendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const newMessage: Message = {
      sender: 'You',
      message: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputMessage('');

    try {
      // Make API call to send message and get response
      // Handle API response as needed
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Chatbot" />
      <div className="px-6 mx-auto max-w-[60rem]">

        <div className="rounded-md border h-full min-h-[60vh] mb-2">
          {/* Render chat messages using MessageBubble component */}
          {messages.map((message, index) => (
            <MessageBubble
              key={index}
              direction={message.sender === 'You' ? 'rtl' : 'ltr'}
              name={message.sender}
              time={message.time}
              message={message.message}
            />
          ))}
          {/* Typing indicator */}
          {/* You can show a typing indicator here while waiting for response */}
        </div>

        <div className="flex flex-row justify-between gap-4">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
          <button onClick={sendMessage} className="inline-flex items-center justify-center rounded-md bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
            Send
          </button>
        </div>

      </div>
    </DefaultLayout>
  );
};

export default Chat;
