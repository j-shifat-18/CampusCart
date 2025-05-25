import React, { useState, useEffect, useRef } from 'react';
import { IoSend } from "react-icons/io5";
import { ImCross } from "react-icons/im";
// import { format } from 'date-fns';

const ProductChat = ({ isOpen, onClose, productId, sellerId, buyerId, currentUserId }) => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [chatId, setChatId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen && productId && sellerId && buyerId) {
            initializeChat();
        }
    }, [isOpen, productId, sellerId, buyerId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const initializeChat = async () => {
        try {
            const response = await fetch('https://campus-cart-server.vercel.app/chats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId,
                    sellerId,
                    buyerId,
                    initialMessage: "Hi! I'm interested in your product."
                }),
            });

            const data = await response.json();
            setChatId(data._id);
            setMessages(data.messages);
        } catch (error) {
            console.error('Error initializing chat:', error);
        }
    };

    const fetchMessages = async () => {
        if (!chatId) return;

        try {
            const response = await fetch(`https://campus-cart-server.vercel.app/chats/${chatId}/messages`);
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleSendMessage = async () => {
        if (!inputMessage.trim() || !chatId) return;

        const message = inputMessage.trim();
        setInputMessage('');
        setIsLoading(true);

        try {
            const response = await fetch(`https://campus-cart-server.vercel.app/chats/${chatId}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    senderId: currentUserId,
                    content: message,
                }),
            });

            const newMessage = await response.json();
            setMessages(prev => [...prev, newMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-2xl h-[600px] flex flex-col shadow-2xl">
                <div className="p-4 flex justify-between items-center bg-primary rounded-t-2xl">
                    <h3 className="font-bold text-lg text-white">Product Chat</h3>
                    <button
                        className="btn btn-sm btn-circle text-primary btn-ghost bg-white p-2 rounded-full hover:bg-gray-100"
                        onClick={onClose}
                    >
                        <ImCross />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className="flex flex-col max-w-[70%]">
                                <div
                                    className={`p-3 rounded-lg ${msg.senderId === currentUserId
                                            ? 'bg-primary text-white rounded-br-none'
                                            : 'bg-gray-100 text-gray-800 rounded-bl-none'
                                        }`}
                                >
                                    {msg.content}
                                </div>
                                <span className="text-xs text-gray-500 mt-1">
                                    {format(new Date(msg.timestamp), 'MMM d, h:mm a')}
                                </span>
                            </div>
                        </div>
                    ))}
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
                    <div className="flex gap-2">
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
                            disabled={isLoading || !inputMessage.trim()}
                            className="btn btn-primary px-4"
                        >
                            <IoSend size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductChat; 