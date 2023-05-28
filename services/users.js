const User = require("../models/users");
const bcrypt = require("bcrypt");

const getUserById = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    console.error({ error });
    throw error;
  }
};

const createNewUser = async ({ name, email, password, role }) => {
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

const getListUsers = async (page, limit) => {
    try {
        const listUsers = await User.find({}).sort('email');
        return listUsers;
    } catch (error) {
        throw error;
    }
}

module.exports = {
  getUserById,
  createNewUser,
  getListUsers
};
