import { useState, useMemo } from "react";
import { Play, ArrowLeft, CheckCircle, BookOpen, Clock } from "lucide-react";

export default function PathshalaPro() {
  // --- CONFIGURATION ---
  // Aapka Backend Engine
  const API_BASE = "https://pathshalax-app.onrender.com"; 
  const CHANNEL = "jaikipathshalax"; 

  // --- LOGIC: GENERATE 157 LECTURES ---
  const lectures = useMemo(() => {
    const list = [];
    
    // Helper Function to make code clean
    const addLecture = (lecNo, msgId) => {
      list.push({
        id: msgId,
        lecNo: lecNo,
        title: `Hindi Sahitya | Lecture Part ${lecNo}`,
        date: "BATCH 2025 • 48:30", // Placeholder time
        description: `🔹 **Topic:** Hindi Sahitya Ka Itihas (Class ${lecNo})\n\n🔹 **Batch:** UPSC CSE Mains 2025\n🔹 **Mentor:** Jai Sir\n\n📌 **Note:** Is lecture ke notes PDF tab mein available hain. Please class ke baad revision jarur karein.`,
        url: `${API_BASE}/api/stream?id=${msgId}&username=${CHANNEL}`
      });
    };

    // LOOP 1: Lecture 1 to 115 (ID = i + 1)
    for (let i = 1; i <= 115; i++) {
      addLecture(i, i + 1);
    }

    // LOOP 2: Lecture 116 to 157 (ID = i + 43)
    for (let i = 116; i <= 157; i++) {
      addLecture(i, i + 43);
    }

    return list.reverse(); // Newest first (optional, remove .reverse() for Oldest first)
  }, []);

  const [currentVideo, setCurrentVideo] = useState(null);
  const [activeTab, setActiveTab] = useState("lectures");

  // --- VIEW 1: VIDEO PLAYER SCREEN ---
  if (currentVideo) {
    return (
      <div className="flex flex-col h-screen bg-black">
        {/* Header */}
        <div className="bg-[#111] text-white p-3 flex items-center gap-3 border-b border-gray-800">
          <button onClick={() => setCurrentVideo(null)} className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div className="overflow-hidden">
            <h1 className="text-sm font-medium truncate">{currentVideo.title}</h1>
            <p className="text-[10px] text-gray-400">Playing from Telegram • ID: {currentVideo.id}</p>
          </div>
        </div>

        {/* Video Area */}
        <div className="w-full aspect-video bg-black flex justify-center items-center relative group">
          <video
            controls
            autoPlay
            className="w-full h-full object-contain"
            src={currentVideo.url}
            poster="https://via.placeholder.com/1280x720/000000/FFFFFF?text=Loading+Class..."
          >
            Your browser does not support video.
          </video>
        </div>

        {/* White Details Section (Scrollable) */}
        <div className="flex-1 bg-white rounded-t-2xl mt-[-10px] z-10 relative overflow-y-auto">
          <div className="p-5 pb-20">
            {/* Tags */}
            <div className="flex gap-2 mb-3">
               <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-blue-100">
                 Class {currentVideo.lecNo}
               </span>
               <span className="bg-purple-50 text-purple-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-purple-100">
                 UPSC Mains
               </span>
            </div>

            <h2 className="text-xl font-bold text-gray-900 leading-snug">{currentVideo.title}</h2>
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
              <Clock size={12} /> {currentVideo.date}
            </p>

            {/* Buttons */}
            <div className="flex gap-3 my-6">
              <button className="flex-1 bg-[#4F46E5] text-white py-3 rounded-xl font-semibold shadow-lg shadow-indigo-200 active:scale-95 transition-all flex justify-center items-center gap-2 text-sm">
                 <CheckCircle size={16} /> Mark Presence
              </button>
              <button className="flex-1 bg-white text-gray-700 py-3 rounded-xl font-medium border border-gray-200 shadow-sm active:bg-gray-50 transition-colors text-sm flex justify-center items-center gap-2">
                 <BookOpen size={16} /> PDF Notes
              </button>
            </div>

            {/* Description Box */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                Scholar's Notebook
              </h3>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-gray-700 text-sm whitespace-pre-wrap leading-7">
                {currentVideo.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW 2: LIST SCREEN (HOME) ---
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pb-10">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-20 border-b border-gray-100">
        <div className="p-4 pb-2">
          <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Hindi Sahitya</h1>
          <p className="text-xs text-gray-500 font-semibold tracking-wide mt-1">FULL COURSE • MENTOR: JAI SIR</p>
        </div>
        
        {/* Tabs */}
        <div className="flex px-4 gap-8 overflow-x-auto no-scrollbar">
          {["LECTURES", "PDF NOTES", "DOUBTS"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`pb-3 text-[11px] font-bold tracking-widest transition-all border-b-2 ${
                activeTab === tab.toLowerCase()
                  ? "border-[#4F46E5] text-[#4F46E5]"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* List Content */}
      <div className="p-4 space-y-3">
        {lectures.map((lec) => (
          <div
            key={lec.id}
            onClick={() => setCurrentVideo(lec)}
            className="group flex items-center gap-4 p-3 bg-white border border-gray-100 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] active:scale-[0.98] transition-all cursor-pointer hover:border-indigo-100 hover:shadow-md"
          >
            {/* Play Icon Circle */}
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Play size={18} fill="currentColor" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-900 text-sm truncate pr-2">{lec.title}</h3>
                <span className="text-[10px] font-bold text-gray-300 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                  #{lec.lecNo}
                </span>
              </div>
              <p className="text-[11px] text-gray-400 mt-1 font-medium">{lec.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

