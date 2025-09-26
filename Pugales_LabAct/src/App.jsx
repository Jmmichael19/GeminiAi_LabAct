import React, { useState, useRef, useEffect } from 'react';
import { askAi } from './lib/ai';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleInputChange = (e) => setPrompt(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setIsLoading(true);

    const aiResponse = await askAi(prompt);
    const newEntry = { user: prompt, ai: aiResponse };
    setHistory((prev) => [...prev, newEntry]);
    setPrompt('');
    setIsLoading(false);
  };

  const handleClear = () => setHistory([]);

  // Handle copy
  const handleCopy = async (text) => {
    await navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleVoiceInput = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      setPrompt(event.results[0][0].transcript);
    };
  };

  const handleSpeak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-r from-blue-300 to-purple-300 text-black'} min-h-screen flex flex-col items-center p-4`}>
      
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 space-y-4">

        <div className="flex justify-between items-center">
          <button 
            onClick={toggleTheme} 
            className="px-3 py-1 rounded bg-indigo-500 text-white hover:bg-indigo-600"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
          <button 
            onClick={handleClear} 
            className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Clear
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input 
            value={prompt}
            onChange={handleInputChange}
            placeholder="Enter your prompt..."
            className="flex-1 border px-4 py-2 rounded-md focus:ring focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
          />
          <button 
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            {isLoading ? "Generating..." : "Submit"}
          </button>
          <button 
            type="button"
            onClick={handleVoiceInput}
            className="bg-yellow-500 text-white px-3 py-2 rounded-md hover:bg-yellow-600"
          >
            🎤
          </button>
        </form>

        <div className="max-h-96 overflow-y-auto space-y-3 border-t pt-3 dark:border-gray-600">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <p className="bg-gray-100 dark:bg-gray-700 p-2 rounded"><b>You:</b> {item.user}</p>
              <div className="flex items-start space-x-2">
                <p className="bg-yellow-100 dark:bg-yellow-600 p-2 rounded flex-1"><b>AI:</b> {item.ai}</p>
                <button onClick={() => handleCopy(item.ai)} className="text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Copy</button>
                <button onClick={() => handleSpeak(item.ai)} className="text-sm bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600">🔊</button>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </div>
    </div>
  );
}
