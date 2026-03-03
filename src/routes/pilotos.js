const express = require('express');
const router = express.Router();
const db = require('../database/db');


router.get('/', (req, res) => {
  db.all('SELECT * FROM pilotos', (err, rows) => {
    if (err) {
      return res.send('Error al obtener pilotos');
    }
    res.render('pilotos', { pilotos: rows });
  });
});


router.post('/agregar', (req, res) => {
  const { nombre, equipo } = req.body;

  db.run(
    'INSERT INTO pilotos (nombre, equipo) VALUES (?, ?)',
    [nombre, equipo],
    () => {
      res.redirect('/pilotos');
    }
  );
});


router.get('/editar/:id', (req, res) => {
  const { id } = req.params;

  db.get(
    'SELECT * FROM pilotos WHERE id = ?',
    [id],
    (err, row) => {
      res.render('editarpiloto', { piloto: row });
    }
  );
});


router.post('/editar/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, equipo } = req.body;

  db.run(
    'UPDATE pilotos SET nombre = ?, equipo = ? WHERE id = ?',
    [nombre, equipo, id],
    () => {
      res.redirect('/pilotos');
    }
  );
});


router.post('/eliminar/:id', (req, res) => {
  const { id } = req.params;

  db.run(
    'DELETE FROM pilotos WHERE id = ?',
    [id],
    () => {
      res.redirect('/pilotos');
    }
  );
});

module.exports = router;