import React, { useState } from 'react';
import { RiChatSmileAiFill } from "react-icons/ri";
import { ImCross } from "react-icons/im";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chatbot Icon */}
      <div
        onClick={() => setIsOpen(true)}
        className='fixed bottom-10 right-2 bg-violet-300 p-2 rounded-full cursor-pointer shadow-lg z-50'
      >
        <RiChatSmileAiFill size={40} color='#6A5ACD' />
      </div>

      {/* Custom Right-Side Modal */}
      {isOpen && (
        <div className="fixed right-4 top-3/5 -translate-y-1/2 w-80 h-80 bg-secondary   z-40 shadow-2xl shadow-primary rounded-2xl">
          <div className="p-4 flex justify-between items-center bg-primary rounded-t-2xl">
            <h3 className="font-bold text-lg text-white">Chatbot</h3>
            <button
              className="btn btn-sm btn-circle text-primary btn-ghost bg-white p-2 rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <ImCross />
            </button>
          </div>
          <div className="p-4">
            <p className="mb-4">Hi! How can I help you today?</p>
            <input
              type="text"
              placeholder="Type your message..."
              className="input input-bordered w-full"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
