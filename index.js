const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');


const pilotosRoutes = require('./src/routes/pilotos');
const resultadosRoutes = require('./src/routes/resultados');


require('./src/database/db');

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src/views'));




app.get('/', (req, res) => {
  res.render('home');
});


app.use('/pilotos', pilotosRoutes);


app.use('/resultados', resultadosRoutes);


app.get('/contacto', (req, res) => {
  res.render('contacto');
});

// ================= SERVIDOR =================
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});