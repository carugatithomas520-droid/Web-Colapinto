const express = require('express');
const router = express.Router();
const db = require('../database/db');

// LISTAR resultados
router.get('/', (req, res) => {
  db.all(
    'SELECT * FROM resultados ORDER BY temporada DESC',
    (err, rows) => {
      if (err) {
        return res.send('Error al cargar resultados');
      }
      res.render('resultados', { resultados: rows });
    }
  );
});

// AGREGAR resultado
router.post('/agregar', (req, res) => {
  const { gran_premio, circuito, posicion, puntos, temporada } = req.body;

  db.run(
    `INSERT INTO resultados 
    (gran_premio, circuito, posicion, puntos, temporada)
    VALUES (?, ?, ?, ?, ?)`,
    [gran_premio, circuito, posicion, puntos, temporada],
    () => {
      res.redirect('/resultados');
    }
  );
});

// FORM editar
router.get('/editar/:id', (req, res) => {
  db.get(
    'SELECT * FROM resultados WHERE id = ?',
    [req.params.id],
    (err, row) => {
      res.render('editarresultado', { resultado: row });
    }
  );
});

// GUARDAR edición
router.post('/editar/:id', (req, res) => {
  const { gran_premio, circuito, posicion, puntos, temporada } = req.body;

  db.run(
    `UPDATE resultados
     SET gran_premio = ?, circuito = ?, posicion = ?, puntos = ?, temporada = ?
     WHERE id = ?`,
    [gran_premio, circuito, posicion, puntos, temporada, req.params.id],
    () => {
      res.redirect('/resultados');
    }
  );
});

// ELIMINAR
router.post('/eliminar/:id', (req, res) => {
  db.run(
    'DELETE FROM resultados WHERE id = ?',
    [req.params.id],
    () => {
      res.redirect('/resultados');
    }
  );
});

module.exports = router;