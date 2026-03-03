const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbName = path.join(__dirname, '../../f1.db');
const db = new sqlite3.Database(dbName, (err) => {
    if (err) return console.error(err.message);
    console.log('Conectado a la base de datos SQLite.');
});

// Crear tabla y un registro inicial
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS pilotos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        equipo TEXT NOT NULL
    )`, (err) => {
        if (!err) {
            // Insertamos a Franco por defecto si la tabla está limpia
            db.run("INSERT INTO pilotos (nombre, equipo) SELECT 'Franco Colapinto', 'Williams' WHERE NOT EXISTS (SELECT 1 FROM pilotos)");
        }
    });
});

module.exports = db;

// TABLA RESULTADOS
db.run(`
  CREATE TABLE IF NOT EXISTS resultados (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    gran_premio TEXT NOT NULL,
    circuito TEXT NOT NULL,
    posicion INTEGER NOT NULL,
    puntos INTEGER NOT NULL,
    temporada INTEGER NOT NULL
  )
`);