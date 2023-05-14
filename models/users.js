const mongoose = require('mongoose');

// Creación del schema para un modelo de usuarios
const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

// Creación del modelo de usuarios
const User = mongoose.model('User', userSchema);

// Exportación del modelo
module.exports = User;
