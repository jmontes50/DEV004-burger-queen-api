const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { getUserById } = require("../services/users");

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
  getUser: async (req, res, next) => {
    try {
      const { uid } = req.params;
      const { _id, email, role } = await getUserById(uid);
      res.status(200).json({ id:_id, email, role });
    } catch (error) {
      throw error;
    }
  }
};
