import React, { useState, useEffect } from 'react';
import { FaComments, FaSearch } from 'react-icons/fa';
import { format } from 'date-fns';
import ProductChat from './ProductChat';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const ChatInbox = () => {
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const currentUserId = localStorage.getItem('userId');

    useEffect(() => {
        if (currentUserId) {
            fetchChats();
        }
    }, [currentUserId]);

    const fetchChats = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${API_URL}/chats/user/${currentUserId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch chats');
            }
            const data = await response.json();
            setChats(data);
        } catch (error) {
            console.error('Error fetching chats:', error);
            toast.error('Failed to load chats. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const filteredChats = chats.filter(chat => {
        const searchLower = searchQuery.toLowerCase();
        return (
            chat.productId?.title?.toLowerCase().includes(searchLower) ||
            chat.buyerId?.name?.toLowerCase().includes(searchLower) ||
            chat.messages[chat.messages.length - 1]?.content?.toLowerCase().includes(searchLower)
        );
    });

    const handleChatSelect = (chat) => {
        setSelectedChat(chat);
        setIsChatOpen(true);
    };

    const getLastMessage = (chat) => {
        const lastMessage = chat.messages[chat.messages.length - 1];
        return lastMessage ? lastMessage.content : 'No messages yet';
    };

    const getUnreadCount = (chat) => {
        return chat.messages.filter(
            msg => !msg.isRead && msg.senderId._id !== currentUserId
        ).length;
    };

    if (!currentUserId) {
        return (
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 my-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Chat Inbox</h2>
                <p className="text-gray-600">Please log in to view your chats.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 my-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Chat Inbox</h2>

            {/* Search Bar */}
            <div className="relative mb-6">
                <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>

            {/* Loading State */}
            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            ) : (
                /* Chat List */
                <div className="space-y-4">
                    {filteredChats.length === 0 ? (
                        <p className="text-gray-600 text-center py-4">No conversations found</p>
                    ) : (
                        filteredChats.map((chat) => (
                            <div
                                key={chat._id}
                                onClick={() => handleChatSelect(chat)}
                                className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                            >
                                <div className="flex-shrink-0 mr-4">
                                    <img
                                        src={chat.productId?.thumbnail}
                                        alt={chat.productId?.title}
                                        className="w-12 h-12 rounded-lg object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                                            {chat.productId?.title}
                                        </h3>
                                        <span className="text-sm text-gray-500">
                                            {format(new Date(chat.lastMessage), 'MMM d, h:mm a')}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 truncate">
                                        {getLastMessage(chat)}
                                    </p>
                                    <div className="flex items-center mt-1">
                                        <span className="text-sm text-gray-500">
                                            with {chat.buyerId?.name}
                                        </span>
                                        {getUnreadCount(chat) > 0 && (
                                            <span className="ml-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                                                {getUnreadCount(chat)} new
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Chat Modal */}
            {selectedChat && (
                <ProductChat
                    isOpen={isChatOpen}
                    onClose={() => setIsChatOpen(false)}
                    productId={selectedChat.productId._id}
                    sellerId={selectedChat.sellerId._id}
                    buyerId={selectedChat.buyerId._id}
                    currentUserId={currentUserId}
                />
            )}
        </div>
    );
};

export default ChatInbox; 