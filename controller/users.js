const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  getUsers: (req, resp, next) => {},
  createUser: async (req, res, next) => {
    try {
      const { name, email, password, role } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10); // Encriptar contraseña con bcrypt

      const user = new User({
        name,
        email,
        password: hashedPassword, // Asignar la contraseña encriptada al campo password del usuario
        role,
      });

      await user.save(); // Guardar el usuario en la base de datos

      res.status(201).json({ message: "Usuario creado con éxito" });
    } catch (error) {
      res.status(500).json({ error: "Error al crear el usuario" });
    }
  },
};
