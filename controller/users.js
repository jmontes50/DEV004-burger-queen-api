const { getUserById, createNewUser, getListUsers, updateUser } = require("../services/users");

module.exports = {
  createUser: async (req, res, next) => {
    try {
      await createNewUser(req.body)
      res.status(201).json({ message: "Usuario creado con éxito" });
    } catch (error) {
      console.log({error});
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
  },
  getUsers: async (req, res, next) => {
    try {
      const { page, limit } = req.params;
      const users = await getListUsers(page, limit);
      res.status(200).json(users)
    } catch (error) {
      throw error;
    }
  },
  updateUser: async (req, res, next) => {
    //funcion para actualizar usuaria
    try {
      const { uid } = req.params;
      const user = await updateUser(uid, req.body);
      res.status(201).json(user);
    } catch (error) {
      throw error;
    }
  }
};
