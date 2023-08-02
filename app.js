// Imports
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const app = express();

//variables de entorno
dotenv.config({ path: ".env" });
const { sequelize } = require('./database/database');

//motor de plantillas
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middlewares
// TODO: Implementar middlewares
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//dirección de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//instancia de conexión con base de datos
sequelize.authenticate()
  .then(() => {   
    console.log('Conexión a base de datos exitosa');
 })
  .catch((error) => console.log('Error al conectar a base de datos', error));
  
// Routes
app.use(require('./routes/reserva.routes'));

// TODO: Si la petición no coincide con ninguna de las rutas declaradas, mostrar error 404

// Starting the server
app.listen(process.env.PORT, () => console.log(`Servidor en http://localhost:${process.env.PORT}`));