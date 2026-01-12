import express from "express";
import cors from "cors";
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import { Api } from "telegram/tl/index.js";

const app = express();
app.use(cors());

// Environment Variables se data lo
const apiId = parseInt(process.env.API_ID);
const apiHash = process.env.API_HASH;
const stringSession = new StringSession(process.env.STRING_SESSION);

console.log("🔄 Connecting to Telegram...");
const client = new TelegramClient(stringSession, apiId, apiHash, {
  connectionRetries: 5,
});

// Server start hote hi Telegram se connect karo
await client.start({
  onError: (err) => console.log(err),
});
console.log("✅ Connected to Telegram!");

app.get("/", (req, res) => {
  res.send("PathshalaX Backend with Telegram is Running! 🚀");
});

// Real Video Streaming Logic
app.get("/api/stream", async (req, res) => {
  try {
    const { id } = req.query; // Message ID (e.g., 101)
    
    // Yahan wo channel username dalein jahan videos upload hain
    // Filhal testing ke liye 'me' (Saved Messages) use kar rahe hain
    // Baad me aap isse change kar sakte hain (e.g., "my_channel_name")
    const CHANNEL_USERNAME = "me"; 
    
    console.log(`Fetching video ID: ${id} from ${CHANNEL_USERNAME}`);

    // Telegram se message dhundho
    const messages = await client.getMessages(CHANNEL_USERNAME, {
      ids: [parseInt(id)],
    });

    if (!messages || !messages[0] || !messages[0].media) {
      return res.status(404).send("Video not found or no media in message");
    }

    const media = messages[0].media;
    
    // File size aur type check karo
    let fileSize = 0;
    let mimeType = "video/mp4";

    if (media.document) {
      fileSize = media.document.size;
      mimeType = media.document.mimeType;
    }

    // Browser ko batao ki video aa raha hai
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = (end - start) + 1;

      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": mimeType,
      });

      // Stream karo (GramJS iterDownload use karke)
      const stream = client.iterDownload(media, {
        offset: BigInt(start),
        limit: chunksize,
      });

      for await (const chunk of stream) {
        res.write(chunk);
      }
      res.end();
    } else {
      res.writeHead(200, {
        "Content-Length": fileSize,
        "Content-Type": mimeType,
      });
      
      const stream = client.iterDownload(media);
      for await (const chunk of stream) {
        res.write(chunk);
      }
      res.end();
    }

  } catch (error) {
    console.error("Error streaming video:", error);
    res.status(500).send("Server Error");
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
