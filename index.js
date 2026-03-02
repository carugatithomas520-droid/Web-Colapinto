const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const pilotosRoutes = require('./src/routes/pilotos');
require('./src/database/db');

const app = express();

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src/views'));

// --- RUTAS ---

// 1. Inicio
app.get('/', (req, res) => {
  res.render('home');
});

// 2. El Piloto (Usa el archivo de rutas para el CRUD)
app.use('/pilotos', pilotosRoutes);

// 3. Resultados
app.get('/resultados', (req, res) => {
    res.render('resultados'); 
});

// 4. Contacto
app.get('/contacto', (req, res) => {
  res.render('contacto');
});

// POST para el envío de MAIL
app.post('/contacto', async (req, res) => {
    const { nombre, email, mensaje } = req.body;

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: 'mckenna.mcclure22@ethereal.email',
            pass: 'S8K8V8X8V8X8V8X8V8'
        }
    });

    try {
        await transporter.sendMail({
            from: email,
            to: "tu-mail@ejemplo.com",
            subject: `Nuevo mensaje de ${nombre}`,
            text: mensaje
        });
        res.send('<h1>¡Mensaje enviado con éxito!</h1><a href="/">Volver al inicio</a>');
    } catch (error) {
        res.send('Error al enviar el mensaje.');
    }
});

// servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});