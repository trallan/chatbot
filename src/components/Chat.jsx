import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import faqData from '../data/faq.json';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // TESTING USEEFFECT
    // const [faqData, setFaqData] = useState([]);

    // faq.json is inside public/data/faq.json
    // useEffect(() => {
    //     fetch('/data/faq.json')
    //         .then(res => res.json())
    //         .then(data => setFaqData(data))
    //         .catch(err => console.error(err));
    //     }, []);

    // Konfigurera Fuse.js
    const fuse = new Fuse(faqData, {
        keys: ['question', 'synonyms'],
        threshold: 0.5
    });

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInput('');

        setIsTyping(true);

        setTimeout(() => {
            const result = fuse.search(input);
            const foundAnswer = result.length > 0 ? result[0].item.answer : null;

            const botMessage = {
                sender: 'bot',
                text: foundAnswer || "Jag är ledsen, jag kunde inte hitta ett svar på din fråga."
            };

            setMessages((prevMessages) => [...prevMessages, botMessage]);
            setIsTyping(false);
        }, 1500);
    };

    // Hantera Enter-knappen
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Förhindra radbrytning i input-fältet
            handleSend();
        }
    };

    return (
        <div className="chat rounded-lg shadow-lg w-5/5 flex flex-col">
            <div className="messages h-[50vh] lg:h-[40vh] mb-4 p-2 rounded-md">
                {messages.map((msg, idx) => (
                    <div key={idx} className={msg.sender === 'user' ? 'text-right' : 'text-left'}>
                        <p className="py-1 m-1 px-2 bg-gray-700 inline-block rounded-lg">
                            {msg.text}
                        </p>
                    </div>
                ))}
                {isTyping && (
                    <div className="text-left">
                        <p className="py-1 px-2 bg-gray-700 inline-block rounded-lg italic opacity-75">Botten skriver...</p>
                    </div>
                )}
            </div>
            <div className="input-box flex gap-2">
                <input
                    className="flex-1 p-2 border border-gray-700 rounded-md bg-gray-900 text-gray-100 placeholder-gray-500"
                    type="text"
                    value={input}
                    placeholder="Skriv din fråga..."
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                    onClick={handleSend}
                >
                    Skicka
                </button>
            </div>
        </div>
    );


};

export default Chat;
