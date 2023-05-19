const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/users');
const bcrypt = require('bcrypt');

const { secret } = config;

/** @module auth */
module.exports = (app, nextMain) => {
  /**
   * @name /auth
   * @description Crea token de autenticación.
   * @path {POST} /auth
   * @body {String} email Correo
   * @body {String} password Contraseña
   * @response {Object} resp
   * @response {String} resp.token Token a usar para los requests sucesivos
   * @code {200} si la autenticación es correcta
   * @code {400} si no se proveen `email` o `password` o ninguno de los dos
   * @auth No requiere autenticación
   */
  app.post('/auth', async(req, resp, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(400);
    }

    try {
      const user = await User.findOne({ email }); // Buscar usuario por email en la base de datos

      if (!user) {
        return next(401); // Usuario no encontrado
      }

      const isPasswordValid = await bcrypt.compare(password, user.password); // Comparar contraseña encriptada con la proporcionada por el usuario

      if (!isPasswordValid) {
        return next(401); // Contraseña incorrecta
      }

      const token = jwt.sign({ userId: user._id }, secret); // Generar token de acceso

      resp.status(200).json({ token });
    } catch (error) {
      resp.status(500).json({ error: 'Error al autenticar al usuario' });
    }

    // TODO: autenticar a la usuarix
    next();
  });

  return nextMain();
};
