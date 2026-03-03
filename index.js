const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

// Rutas
const pilotosRoutes = require('./src/routes/pilotos');
const resultadosRoutes = require('./src/routes/resultados');

// Base de datos
require('./src/database/db');

const app = express();

// ================= MIDDLEWARES =================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ================= HANDLEBARS =================
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src/views'));

// ================= RUTAS =================

// Home
app.get('/', (req, res) => {
  res.render('home');
});

// Pilotos (perfil + CRUD)
app.use('/pilotos', pilotosRoutes);

// Resultados (CRUD)
app.use('/resultados', resultadosRoutes);

// Contacto
app.get('/contacto', (req, res) => {
  res.render('contacto');
});

// ================= SERVIDOR =================
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});