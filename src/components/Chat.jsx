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
        <div className="chat">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender}>
                        <p>{msg.text}</p>
                    </div>
                ))}
                {isTyping && (
                    <div className="bot">
                        <p><i>Botten skriver...</i></p>
                    </div>
                )}
            </div>
            <div className="input-box">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown} // Lägg till detta för att hantera Enter
                    placeholder="Skriv din fråga..."
                />
                <button onClick={handleSend}>Skicka</button>
            </div>
        </div>
    );
};

export default Chat;
