const connectDB = require("../../db/db");

const saveSession = (id, session) => {
  const db = connectDB();
  db.run(
    `REPLACE INTO sessions (id, session) VALUES (?, ?)`,
    [id, session],
    (err) => {
      if (err) {
        console.error("Erro ao salvar sessão:", err.message);
      } else {
        console.log("Sessão salva com sucesso.");
      }
    }
  );
  db.close();
};

const loadSession = (id, callback) => {
  const db = connectDB();
  db.get(`SELECT session FROM sessions WHERE id = ?`, [id], (err, row) => {
    if (err) {
      console.error("Erro ao carregar sessão:", err.message);
    }
    callback(row ? row.session : null);
  });
  db.close();
};

const deleteSession = (id) => {
  const db = connectDB();
  db.run(`DELETE FROM sessions WHERE id = ?`, [id], (err) => {
    if (err) {
      console.error("Erro ao excluir sessão:", err.message);
    } else {
      console.log("Sessão excluída com sucesso.");
    }
  });
  db.close();
};

module.exports = {
  saveSession,
  loadSession,
  deleteSession,
};
