const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");

(async () => {
  console.log("Starting...");
  const apiId = Number(await input.text("API ID: "));
  const apiHash = await input.text("API Hash: ");
  const client = new TelegramClient(new StringSession(""), apiId, apiHash, { connectionRetries: 5 });
  
  await client.start({
    phoneNumber: async () => await input.text("Phone Number (+91...): "),
    password: async () => await input.text("Password (if 2FA is on): "),
    phoneCode: async () => await input.text("Code: "),
    onError: (err) => console.log(err),
  });
  
  console.log("\nSESSION STRING (Copy below):\n");
  console.log(client.session.save());
  process.exit(0);
})();

