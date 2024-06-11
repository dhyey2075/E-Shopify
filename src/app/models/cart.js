import mongoose from 'mongoose';
const { Schema } = mongoose;

const cartSchema = new Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    productID: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
  });

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

export default Cart;
