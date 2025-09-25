import React from 'react';
import { useState } from 'react';
import { askAi } from './lib/ai';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await askAi(prompt);
    setResponse(response);
    setPrompt('');
    setIsLoading(false);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-blue-300 space-y-4'>
      <input value={prompt} onChange={handleInputChange} placeholder="Enter your prompt:" className="border px-5 py-2 rounded text-center bg-amber-200" />
      <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-yellow-300 space-x-0.5">{isLoading ? "Generating" : "Submit"}</button>
      <p className='bg-yellow-300 rounded border'>{response}</p>
    </div>
  );
} 