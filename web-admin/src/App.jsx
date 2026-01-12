import React, { useState, useMemo } from "react";
import { Play, FileText, ChevronRight, ArrowLeft } from "lucide-react";

function App() {
  const [activeTab, setActiveTab] = useState("lectures");
  const [selectedVideo, setSelectedVideo] = useState(null);

  // 157 Videos List
  const lectures = useMemo(() => {
    return Array.from({ length: 157 }, (_, i) => {
      const id = i + 1;
      return {
        id: id,
        title: `Hindi Sahitya | Lecture Class ${id}`,
        date: "FULL CLASS • HINDI SAHITYA",
        duration: "01:00:00"
      };
    });
  }, []);

  // Telegram ID Logic
  const getTelegramId = (videoId) => {
    if (videoId <= 115) {
      return videoId + 1;
    } else {
      return videoId + 43;
    }
  };

  const handlePlay = (video) => {
    setSelectedVideo(video);
  };

  if (selectedVideo) {
    const apiUrl = import.meta.env.VITE_API_URL || "https://pathshalax-app.onrender.com";
    const realTelegramId = getTelegramId(selectedVideo.id);
    
    return (
      <div className="min-h-screen bg-black text-white flex flex-col font-sans">
        <div className="w-full aspect-video bg-gray-900 sticky top-0 z-50">
           <video 
             controls 
             autoPlay 
             className="w-full h-full object-contain"
             src={`${apiUrl}/api/stream?id=${realTelegramId}`}
           >
             Your browser does not support the video tag.
           </video>
        </div>
        <div className="p-4 bg-gray-900 flex-1 overflow-y-auto">
          <button onClick={() => setSelectedVideo(null)} className="text-gray-400 mb-4 flex items-center gap-2 text-sm font-medium hover:text-white transition-colors">
             <ArrowLeft size={18} /> Back to Course
          </button>
          <h2 className="font-bold text-lg text-white mb-6">{selectedVideo.title}</h2>

          <div className="bg-gray-800 rounded-xl p-4 mb-6 flex items-center justify-between border border-gray-700">
             <div className="flex items-center gap-3">
               <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
               <div className="flex flex-col">
                 <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">Live Sync</span>
                 <span className="text-xs font-bold text-gray-300">ATTENDANCE</span>
               </div>
             </div>
             <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg text-xs font-bold shadow-md transition-all active:scale-95">
               MARK PRESENCE
             </button>
          </div>

          <div className="mb-2 px-1 flex justify-between items-end">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Scholar's Notebook</span>
            <span className="text-[10px] text-indigo-400 font-medium">AUTO-SAVING</span>
          </div>
          <textarea 
            className="w-full h-40 bg-black/40 rounded-xl border border-gray-700 p-4 text-sm text-gray-300 focus:outline-none focus:border-indigo-500 transition-colors resize-none placeholder-gray-600"
            placeholder="Write your important notes here..."
          ></textarea>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <div className="bg-white px-4 pt-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
           <div className="p-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200"><ArrowLeft size={20} className="text-gray-800"/></div>
           <div>
             <h1 className="font-bold text-lg leading-tight text-gray-900">Hindi Sahitya (Full Course)</h1>
             <p className="text-[11px] text-gray-500 font-bold tracking-wide mt-0.5">MENTOR: JAI SIR • 157 LECTURES</p>
           </div>
        </div>
        <div className="flex border-b border-gray-200">
          <button onClick={() => setActiveTab("lectures")} className={`flex-1 pb-3 text-sm font-bold text-center border-b-2 transition-all ${activeTab === "lectures" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-400 hover:text-gray-600"}`}>LECTURES</button>
          <button onClick={() => setActiveTab("notes")} className={`flex-1 pb-3 text-sm font-bold text-center border-b-2 transition-all ${activeTab === "notes" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-400 hover:text-gray-600"}`}>PDF NOTES</button>
        </div>
      </div>
      <div className="p-4 space-y-3 overflow-y-auto flex-1 bg-gray-50">
        {activeTab === "lectures" && lectures.map((lecture) => (
          <div key={lecture.id} onClick={() => handlePlay(lecture)} className="group bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors"><Play size={20} fill="currentColor" /></div>
              <div><h3 className="font-semibold text-gray-800 text-sm mb-0.5">{lecture.title}</h3><p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">{lecture.date}</p></div>
            </div>
            <ChevronRight size={20} className="text-gray-300 group-hover:text-indigo-600 transition-colors" />
          </div>
        ))}
        {activeTab !== "lectures" && <div className="h-64 flex flex-col items-center justify-center text-gray-400"><FileText size={40} className="opacity-20 mb-2"/><p className="text-sm font-medium">No notes available</p></div>}
      </div>
    </div>
  );
}
export default App;

