const bcrypt = require('bcrypt');
const User = require('../models/users');

const getUserById = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    console.error({ error });
    throw error;
  }
};

const createNewUser = async ({
  name, email, password, role,
}) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    return newUser;
  } catch (error) {
    throw error;
  }
};

const getListUsers = async (page = 1, limit = 20) => {
  try {
    const skip = (page - 1) * limit;
    const users = await User.find().select('-password').skip(skip).limit(limit);
    return users;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (id, {
  name, email, password, role,
}) => {
  try {
    const user = await User.findById(id);
    if (!user) throw new Error('Usuario no encontrado');
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    if (role) user.role = role;
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUserById,
  createNewUser,
  getListUsers,
  updateUser,
};
