console.log('DB CARGADA');

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(
  path.join(__dirname, 'f1.db'),
  () => {
    console.log('SQLite conectada');
  }
);

module.exports = db;

db.run(`
  CREATE TABLE IF NOT EXISTS pilotos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    equipo TEXT
  )
`);

module.exports = db;