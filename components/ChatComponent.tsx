'use client'

import axios from 'axios';
import React, { useState } from 'react';
import ChatButton from './Buttons';
import { MessageComponent, MessageComponentProps } from './MessageComponent';

const ChatComponent: React.FC = () => {


const apiUrl =   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/chat-proxy`
  // useState to hold messages
  const [messages, setMessages] = useState<MessageComponentProps[]>([
    { name: 'IA', backgroundColor: 'bg-secondary-100', darkbackgroundColor: 'bg-gray-700' , content:'IA hello world' },
  ]);

  const [message, setMessage] = useState(''); // Holds the new message input by the user

  // Function to handle the message send
  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    
    event.preventDefault(); // Prevent default form behavior

    // Append new message to the messages array
    setMessages((prevMessages) => [
      ...prevMessages,
      { name: 'User', backgroundColor: 'bg-gray-200', darkbackgroundColor: 'bg-gray-100', content: message },
    ]);


    axios.post(apiUrl, {chatQuestion: message})
    .then((response) => {
      console.log(response);
      setMessages((prevMessages) => [
        ...prevMessages,
        { name: 'IA', backgroundColor: 'bg-secondary-100', darkbackgroundColor: 'bg-gray-700', content: response?.data?.chatResponse as string },
      ]);
    })
    .catch((error) => {
      console.error("Error posting data: ", error);
    });
    setMessage(''); 
  };

  return (
    <div>
      <ChatButton />
      <div className="fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[550px]"
        style={{ boxShadow: '0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)' }}>
        <div className="flex flex-col space-y-1.5 pb-6">
          <h2 className="font-semibold text-lg tracking-tight text-black">Chatbot</h2>
        </div>
        
        {/* Scrollable container for messages */}
        <div className="flex flex-col h-[400px] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 pr-4">
          {messages.map((msg, index) => (
            <MessageComponent key={index}  name={msg.name} content={msg.content} backgroundColor={msg.backgroundColor} darkbackgroundColor={msg.darkbackgroundColor} />
          ))}
        </div>

        {/* Input form at the bottom */}
        <div className='mt-4'>
          <form className="flex items-center" onSubmit={sendMessage}>
            <input
              className="flex-grow h-10 rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
              placeholder="Type your message" value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="ml-2 inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-secondary-900 hover:bg-secondary-600 h-10 px-4 py-2"
              type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;