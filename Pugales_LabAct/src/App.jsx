import React, { useState, useRef, useEffect } from 'react';
import { askAi } from './lib/ai';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleCopy = async (text) => {
    await navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

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
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-4">
      <div className="w-full max-w-2xl bg-gray-800 shadow-xl rounded-xl p-6 space-y-4">

        <div className="flex justify-end items-center">
          <button onClick={handleClear} className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600">Clear</button>
        </div>

        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input value={prompt}onChange={handleInputChange}placeholder="Enter your prompt..."className="flex-1 border px-4 py-2 rounded-md focus:ring focus:ring-blue-400 bg-gray-700 text-white"/>
          <button type="submit"className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            {isLoading ? "Generating..." : "Submit"}
          </button>
        </form>

        <div className="max-h-96 overflow-y-auto space-y-3 border-t pt-3 border-gray-600">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <p className="bg-gray-700 p-2 rounded"><b>You:</b> {item.user}</p>
              <div className="flex items-start space-x-2">
                <p className="bg-yellow-600 p-2 rounded flex-1"><b>Neko:</b> {item.ai}</p>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </div>
    </div>
  );
}
