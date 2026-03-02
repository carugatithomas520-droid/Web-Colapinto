const db = require('../database/db');

// LISTAR
exports.listar = (req, res) => {
  db.all('SELECT * FROM pilotos', (err, rows) => {
    res.render('pilotos', { pilotos: rows });
  });
};

// CREAR
exports.crear = (req, res) => {
  const { nombre, equipo } = req.body;

  db.run(
    'INSERT INTO pilotos (nombre, equipo) VALUES (?, ?)',
    [nombre, equipo],
    () => res.redirect('/pilotos')
  );
};

// FORMULARIO EDITAR
exports.editarForm = (req, res) => {
  const { id } = req.params;

  db.get(
    'SELECT * FROM pilotos WHERE id = ?',
    [id],
    (err, piloto) => {
      res.render('editarPiloto', { piloto });
    }
  );
};

// GUARDAR EDICIÓN
exports.editarGuardar = (req, res) => {
  const { id } = req.params;
  const { nombre, equipo } = req.body;

  db.run(
    'UPDATE pilotos SET nombre = ?, equipo = ? WHERE id = ?',
    [nombre, equipo, id],
    () => res.redirect('/pilotos')
  );
};

// ELIMINAR
exports.eliminar = (req, res) => {
  db.run(
    'DELETE FROM pilotos WHERE id = ?',
    [req.params.id],
    () => res.redirect('/pilotos')
  );
};