const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { secret } = require('../config');

const User = require('../models/users');

const login = async (req, resp, next) => {
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

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, secret, { expiresIn: '12h' }); // Generar token de acceso

    resp.status(200).json({ token });
  } catch (error) {
    resp.status(500).json({ error: 'Error al autenticar al usuario' });
  }
};

module.exports = {
  login,
};
