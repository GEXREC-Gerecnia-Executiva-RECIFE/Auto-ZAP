// main.js
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const {
  handleSaveSession,
  handleLoadSession,
  handleDeleteSession,
} = require("./src/controllers/sessionController");
const { handleUserMessage } = require("./src/controllers/messageController");

async function startBot() {
  const client = new Client({
    authStrategy: new LocalAuth({
      clientId: "suporte_ti_bot",
      dataPath: "./sessions",
      store: {
        set: (session, value) => handleSaveSession("suporte_ti_bot", value),
        get: (session, callback) =>
          handleLoadSession("suporte_ti_bot", callback),
        remove: (session) => handleDeleteSession("suporte_ti_bot"),
      },
    }),
  });

  client.on("qr", (qr) => {
    console.log("QR code recebido, escaneie com o WhatsApp:");
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => {
    console.log("Cliente pronto!");
  });

  // Função assíncrona para manipular mensagens
  client.on("message", async (message) => {
    try {
      await handleUserMessage(client, message);
      console.log(message.body);
    } catch (error) {
      console.error("Erro ao processar a mensagem:", error);
    }
  });

  client.initialize();
}

module.exports = {
  startBot,
};
