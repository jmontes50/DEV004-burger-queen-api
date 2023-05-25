const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
  name: {
    type: String,
    index: true,
    required: false,
  },
}, {
  timestamps: true,
});

module.exports = model('Category', categorySchema);