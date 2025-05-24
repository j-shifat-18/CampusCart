import React, { useState } from 'react';
import { RiChatSmileLine } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import ChatList from './ChatList';
import ProductChat from './ProductChat';

const ChatInterface = ({ currentUserId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedChat, setSelectedChat] = useState(null);
    const [showProductChat, setShowProductChat] = useState(false);

    const handleSelectChat = (chat) => {
        setSelectedChat(chat);
        setShowProductChat(true);
    };

    const handleCloseProductChat = () => {
        setShowProductChat(false);
        setSelectedChat(null);
    };

    return (
        <>
            {/* Floating Chat Icon */}
            <div
                onClick={() => setIsOpen(true)}
                className='fixed bottom-10 right-2 bg-violet-300 p-2 rounded-full cursor-pointer shadow-lg z-50 hover:bg-violet-400 transition-colors'
            >
                <RiChatSmileLine size={40} color='#6A5ACD' />
            </div>

            {/* Chat Interface Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl w-full max-w-4xl h-[600px] flex shadow-2xl">
                        {/* Chat List Sidebar */}
                        <div className="w-1/3 border-r p-4 flex flex-col">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-lg">Messages</h3>
                                <button
                                    className="btn btn-sm btn-circle text-primary btn-ghost bg-white p-2 rounded-full hover:bg-gray-100"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <ImCross />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                <ChatList
                                    currentUserId={currentUserId}
                                    onSelectChat={handleSelectChat}
                                />
                            </div>
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1">
                            {showProductChat && selectedChat ? (
                                <ProductChat
                                    isOpen={showProductChat}
                                    onClose={handleCloseProductChat}
                                    productId={selectedChat.productId}
                                    sellerId={selectedChat.sellerId}
                                    buyerId={selectedChat.buyerId}
                                    currentUserId={currentUserId}
                                />
                            ) : (
                                <div className="h-full flex items-center justify-center text-gray-500">
                                    <div className="text-center">
                                        <RiChatSmileLine size={48} className="mx-auto mb-4" />
                                        <p>Select a chat to start messaging</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatInterface; 