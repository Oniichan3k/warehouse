import { Schema, default as mongoose } from 'mongoose';

const productSchema = new Schema({
  productCode: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productGroup: {
    type: String,
    required: true,
  },
  productMedia: {
    type: [String],

  },
  productDescription: {
    type: String,
    required: true,
  },
  productDVT: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productQuantityImport: {

    type: Number,
    default: 0,
  },
  productQuantityExport: {

    type: Number,
    default: 0,
  },
  productQuantityRemaining: {

    type: Number,
    default: 0,
  },
  dateOfManufacture: {

    type: Date,
  },
  expirationDate: {

    type: Date,
  },

  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;