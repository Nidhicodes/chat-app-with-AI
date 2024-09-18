"use client";
import React, { useState } from 'react';
import Chatbot from './Chatbot'; 

const ChatbotButton: React.FC = () => {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    const toggleChatbot = () => {
        setIsChatbotOpen(!isChatbotOpen);
    };

    return (
        <>
            <button
                onClick={toggleChatbot}
                className="fixed bottom-15 right-[140px] bg-red-600 text-white p-4 rounded-full shadow-lg"
            >
                Ask AI
            </button>
            
            {isChatbotOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <button
                            onClick={toggleChatbot}
                            className="absolute top-4 right-4 text-gray-500"
                        >
                            ×
                        </button>
                        <Chatbot />
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatbotButton;
