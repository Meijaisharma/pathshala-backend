import React, { useState } from "react";

function App() {
  const [videoId, setVideoId] = useState("");
  
  const handlePlay = () => {
    if(!videoId) return;
    const apiUrl = import.meta.env.VITE_API_URL || "https://pathshalax-app.onrender.com";
    window.location.href = `${apiUrl}/api/stream?id=${videoId}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6 text-blue-600">Pathshala Player</h1>
        <input 
          type="text" 
          placeholder="Enter Video ID" 
          className="w-full p-3 border rounded mb-4"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
        />
        <button 
          onClick={handlePlay}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 font-semibold"
        >
          Play Video
        </button>
      </div>
    </div>
  );
}
export default App;
