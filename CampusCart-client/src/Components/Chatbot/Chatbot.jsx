import React, { useState, useRef, useEffect } from 'react';
import { RiChatSmileAiFill } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import { IoSend } from "react-icons/io5";
import { FaImage } from "react-icons/fa";
import { toast } from 'react-toastify';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const validateImageUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !imageUrl) {
      toast.warning('Please enter a message or image URL');
      return;
    }

    if (imageUrl && !validateImageUrl(imageUrl)) {
      toast.error('Please enter a valid image URL');
      return;
    }

    const userMessage = inputMessage.trim();
    setMessages(prev => [...prev, {
      role: 'user',
      content: userMessage,
      image: imageUrl
    }]);
    setInputMessage('');
    setIsLoading(true);

    try {
      let response;
      if (imageUrl) {
        // Handle image-based chat
        response = await fetch('http://localhost:3000/chats/image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imageUrl: imageUrl,
            prompt: userMessage || 'What do you see in this image?'
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to process image');
        }

        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || 'Failed to process image');
        }

        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.content
        }]);
      } else {
        // Handle text-based chat
        response = await fetch('http://localhost:3000/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userMessage }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to process message');
        }

        const data = await response.json();
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.content
        }]);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Sorry, I encountered an error. Please try again.');
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
      setImageUrl('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const removeImage = () => {
    setImageUrl('');
  };

  return (
    <>
      {/* Floating Chatbot Icon */}
      <div
        onClick={() => setIsOpen(true)}
        className='fixed bottom-10 right-2 bg-violet-300 p-2 rounded-full cursor-pointer shadow-lg shadow-purple-400 z-50 hover:bg-violet-400 transition-colors'
      >
        <RiChatSmileAiFill size={40} color='#6A5ACD' />
      </div>

      {/* Custom Right-Side Modal */}
      {isOpen && (
        <div className="fixed right-4 top-2/4 -translate-y-1/2 w-96 h-[400px] bg-white z-40 shadow-2xl rounded-2xl flex flex-col">
          <div className="p-4 flex justify-between items-center bg-primary rounded-t-2xl">
            <h3 className="font-bold text-lg text-white">Campus Cart Assistant</h3>
            <button
              className="btn btn-sm btn-circle text-primary btn-ghost bg-white p-2 rounded-full hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <ImCross />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-4">
                <p>Hi! I'm your Campus Cart assistant.</p>
                <p>How can I help you today?</p>
                <p className="text-sm mt-2">You can ask me questions or share an image URL for analysis.</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user'
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}
                  >
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="User uploaded"
                        className="max-w-full h-auto rounded-lg mb-2"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
                        }}
                      />
                    )}
                    {msg.content}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t">
            {imageUrl && (
              <div className="relative mb-2">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="max-h-32 rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150?text=Invalid+Image+URL';
                  }}
                />
                <button
                  onClick={removeImage}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                >
                  <ImCross size={12} />
                </button>
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Paste image URL here..."
                className="input input-bordered flex-1"
              />
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="input input-bordered flex-1"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || (!inputMessage.trim() && !imageUrl)}
                className="btn btn-primary px-4"
              >
                <IoSend size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
