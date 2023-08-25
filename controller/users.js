const {
  getUserById, createNewUser, getListUsers, updateUser,
} = require('../services/users');

module.exports = {
  createUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ message: 'Bad Request, you must provide email and password' });
        return;
      }
      await createNewUser(req.body);
      res.status(201).json({ message: 'User created' });
    } catch (error) {
      res.status(500).json({ error: 'Error at create user' });
    }
  },
  getUser: async (req, res) => {
    try {
      const { uid } = req.params;
      const { _id, email, role } = await getUserById(uid);
      res.status(200).json({ id: _id, email, role });
    } catch (error) {
      res.status
      throw error;
    }
  },
  getUsers: async (req, res) => {
    try {
      const { page, limit } = req.params;
      const users = await getListUsers(page, limit);
      res.status(200).json(users);
    } catch (error) {
      throw error;
    }
  },
  updateUser: async (req, res) => {
    // funcion para actualizar usuaria
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ message: 'Bad Request, you must provide email and password' });
        return;
      }
      const { uid } = req.params;
      const user = await updateUser(uid, req.body);
      res.status(201).json(user);
    } catch (error) {
      throw error;
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { uid } = req.params;
      const user = await deleteUserById(uid);
      res.status(200).json(user);
    } catch (error) {
      throw error;
    }
  },
};
