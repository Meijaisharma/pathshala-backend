import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import input from "input";

const apiId = 34092408;
const apiHash = "13bdb62f6a9424169574109474cd6bde";
const stringSession = new StringSession("");

(async () => {
  console.log("🔄 Telegram se connect ho raha hai...");
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });

  await client.start({
    phoneNumber: async () => await input.text("Apna mobile number dalein (country code ke sath, e.g. +919999...): "),
    password: async () => await input.text("Agar 2-Step Verification hai to password dalein (varna Enter dabayein): "),
    phoneCode: async () => await input.text("Telegram par aaya hua OTP dalein: "),
    onError: (err) => console.log(err),
  });

  console.log("\n✅ LOGIN SUCCESSFUL! Mubarak ho! \n");
  console.log("👇 Is lambe code ko copy karke sambhal lein (Ye apki Session String hai):");
  console.log("---------------------------------------------------");
  console.log(client.session.save());
  console.log("---------------------------------------------------");
  process.exit(0);
})();
