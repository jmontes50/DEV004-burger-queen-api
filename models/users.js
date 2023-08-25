const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
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
    enum: ['user', 'chef', 'admin'],
    default: 'user',
  },
});

// eslint-disable-next-line func-names
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.hash_password);
};

const User = model('User', UserSchema);

module.exports = User;
