import { Schema, default as mongoose } from 'mongoose';

const providerSchema = new Schema({
  providerCode: {
    type: String,
    required: true,
  },
  providerName: {
    type: String,
    required: true,
  },
  providerAddress: {
    type: String,
    required: true,
  },
  providerPhone: {
    type: String,
    required: true,
  },
  providerEmail: {
    type: String,
    required: true,
  },

  representative: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

const Provider = mongoose.model('Provider', providerSchema);
export default Provider;