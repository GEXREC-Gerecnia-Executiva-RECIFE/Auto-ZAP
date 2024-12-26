const sqlite3 = require('sqlite3').verbose();

// Função para conectar ao banco de dados SQLite
const connectDB = () => {
    return new sqlite3.Database('./db/DataBase.db', (err) => {
        if (err) {
            return console.error('Erro ao conectar no banco de dados:', err.message);
        }
        console.log('Conectado ao banco de dados SQLite.');
    });
};

module.exports = connectDB;