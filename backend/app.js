// ---------------------------------------------------------//
// Modules Importing
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const pool = require('./config/db.config');
const cors = require('cors');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());


// ---------------------------------------------------------//
// Configurar nodemailer con tus credenciales SMTP
const transporter = nodemailer.createTransport({
  service: 'Mailgun',
  port: '587',
  host: 'smtp.mailgun.org',
  auth: {
    user: 'postmaster@sandboxf2bd41cbb7324fcba89a3bf0d5545787.mailgun.org',
    pass: 'c2775ea1439397bb58a16b2c5f55b711'
  }
});

// Ruta para enviar correos
app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;
  
  const mailOptions = {
    from: 'noreply@realtest.com',
    to: 'leonmsaia@gmail.com',
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al enviar el correo');
    } else {
      console.log('Correo enviado: ' + info.response);
      res.status(200).send('Correo enviado correctamente');
    }
  });
});

// ---------------------------------------------------------//


// ---------------------------------------------------------//
// Ruta para obtener todos los datos de la tabla properties
app.get('/properties', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM myuser.properties');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener properties:', error);
    res.status(500).json({ message: 'Error al obtener properties' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// ---------------------------------------------------------//

// Endpoint para el registro de usuarios
app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  // Verificar si el usuario ya existe en la base de datos
  const userExistsQuery = 'SELECT * FROM myuser.users WHERE username = $1 OR email = $2';
  const userExistsValues = [username, email];
  const userExistsResult = await pool.query(userExistsQuery, userExistsValues);

  if (userExistsResult.rows.length > 0) {
    return res.status(400).json({ message: 'El usuario ya existe.' });
  }

  // Hash de la contraseña antes de almacenarla en la base de datos
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insertar el nuevo usuario en la base de datos
  const createUserQuery = 'INSERT INTO myuser.users (username, password, email) VALUES ($1, $2, $3) RETURNING *';
  const createUserValues = [username, hashedPassword, email];
  const newUser = await pool.query(createUserQuery, createUserValues);

  res.status(201).json({ message: 'Usuario registrado exitosamente.' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Buscar el usuario en la base de datos
  const getUserQuery = 'SELECT * FROM myuser.users WHERE username = $1';
  const getUserValues = [username];
  const user = await pool.query(getUserQuery, getUserValues);

  if (user.rows.length === 0) {
    return res.status(401).json({ message: 'Credenciales inválidas.' });
  }

  // Verificar la contraseña
  const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Credenciales inválidas.' });
  }

  // Generar un token de autenticación
  const token = jwt.sign({ userId: user.rows[0].id }, 'secreto', { expiresIn: '1h' });

  res.status(200).json({ token });
});





// ---------------------------------------------------------//