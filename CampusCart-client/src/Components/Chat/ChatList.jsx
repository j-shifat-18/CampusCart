import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { RiChatSmileLine } from "react-icons/ri";

const ChatList = ({ currentUserId, onSelectChat }) => {
    const [chats, setChats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchChats();
    }, [currentUserId]);

    const fetchChats = async () => {
        try {
            const response = await fetch(`https://campus-cart-server.vercel.app/chats/${currentUserId}`);
            const data = await response.json();
            setChats(data);
        } catch (error) {
            console.error('Error fetching chats:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (chats.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <RiChatSmileLine size={48} className="mb-4" />
                <p>No active chats</p>
                <p className="text-sm">Start a conversation about a product</p>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {chats.map((chat) => {
                const lastMessage = chat.messages[chat.messages.length - 1];
                const isUnread = !lastMessage?.read && lastMessage?.senderId !== currentUserId;

                return (
                    <div
                        key={chat._id}
                        onClick={() => onSelectChat(chat)}
                        className={`p-4 rounded-lg cursor-pointer transition-colors ${isUnread ? 'bg-primary bg-opacity-10' : 'hover:bg-gray-100'
                            }`}
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-800">
                                    {chat.sellerId === currentUserId ? 'Buyer' : 'Seller'}
                                </h4>
                                <p className="text-sm text-gray-600 truncate">
                                    {lastMessage?.content || 'No messages yet'}
                                </p>
                            </div>
                            <div className="text-xs text-gray-500">
                                {lastMessage && format(new Date(lastMessage.timestamp), 'MMM d')}
                            </div>
                        </div>
                        {isUnread && (
                            <div className="mt-2 flex items-center">
                                <span className="w-2 h-2 bg-primary rounded-full"></span>
                                <span className="text-xs text-primary ml-2">New message</span>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ChatList; 