import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

// Check if server is running
app.get("/", (req, res) => {
  res.send("PathshalaX Backend Engine is Running! 🚀");
});

// Stream API (Video Logic)
app.get("/api/stream", (req, res) => {
  const { id, username } = req.query;
  console.log(`Requested Video ID: ${id} from Channel: ${username}`);
  
  // Sample video for testing
  res.redirect("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

