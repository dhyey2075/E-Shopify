import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    brand: {
      type: String,
      required: true,
      trim: true
    },
    stock: {
      type: Number,
      required: true,
      min: 0
    },
    specifications: {
        type: Map,
        of: String,
        required: true
    },
    images: {
      type: [String],
      required: true
    },
    dateAdded: {
      type: Date,
      default: Date.now
    }
  });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
