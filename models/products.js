const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },
    image: {
      type: String,
    },
    category: {
      ref: 'Category',
      type: Schema.Types.ObjectId,
      required: true
    },
    active: {
      type: Boolean,
      default: true,
      required: true,
    }
  },
  {
    timestamps: true,
  },
);

module.exports = model('Product', productSchema);
