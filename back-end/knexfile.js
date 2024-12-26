
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/DataBase.db'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    }
  }
};

