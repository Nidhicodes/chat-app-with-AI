"use client"
import React, { useState } from 'react';

interface ChatMessage {
    sender: string;
    content: string;
}

const Chatbot: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userMessage: ChatMessage = { sender: 'user', content: message };
        setChatHistory([...chatHistory, userMessage]);
        setMessage('');
    
        try {
            const response = await fetch('/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
    
            const data = await response.json();
            console.log('Response data:', data); 

            if (!data || typeof data.result !== 'string') {
                throw new Error('Invalid response format');
            }
    
            const botMessage: ChatMessage = { sender: 'bot', content: data.result };
            setChatHistory([...chatHistory, userMessage, botMessage]);
        } catch (error) {
            console.error('Error:', error);
            const errorMessage: ChatMessage = { sender: 'bot', content: 'Sorry, there was an error processing your message.' };
            setChatHistory([...chatHistory, userMessage, errorMessage]);
        }
    };
    

    return (
        <div>
            <h2>Chat with AI</h2>
            <div>
                {chatHistory.map((msg, index) => (
                    <div key={index} className={msg.sender}>
                        <strong>{msg.sender}:</strong> {msg.content}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button type="submit">Ask the bot🤖</button>
            </form>
        </div>
    );
};

export default Chatbot;
