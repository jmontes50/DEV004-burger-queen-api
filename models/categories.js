const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
  name: {
    type: String,
    index: true,
    required: false,
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
}, {
  timestamps: true,
});

module.exports = model('Category', categorySchema);