const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    client: {
      type: String,
      required: false,
    },
    products: [
      {
        qty: {
          type: Number,
          default: 1,
        },
        productId: {
          ref: 'Product',
          // type: String,
          type: Schema.Types.ObjectId,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'process', 'finished'],
      default: 'pending',
    },
  },
  {
    timestamps: { createdAt: 'dateEntry', updatedAt: 'dateProcessed' },
  },
);

module.exports = model('Order', orderSchema);
