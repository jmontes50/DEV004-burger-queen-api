const express = require("express");
const morgan = require('morgan');
const mongoose = require("mongoose");
const config = require("./config");
const authMiddleware = require("./middleware/auth");
const errorHandler = require("./middleware/error");
const routes = require("./routes");
const pkg = require("./package.json");

const { port, dbUrl, secret } = config;
const app = express();

// TODO: Conexión a la Base de Datos (MongoDB o MySQL)

app.set("config", config);
app.set("pkg", pkg);

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(express.json());
app.use(authMiddleware(secret));

mongoose
  .connect(dbUrl, { useNewUrlParser:true })
  .then(() => console.log("Conexión a la base de datos establecida"))
  .catch((err) => console.error("Error al conectar a la base de datos", err));

// Registrar rutas
routes(app, (err) => {
  if (err) {
    console.log('Error al registrar rutas', err);
    throw err;
  }

  app.use(errorHandler);

  app.listen(port, () => {
    console.info(`App listening on port ${port}`);
  });
});
