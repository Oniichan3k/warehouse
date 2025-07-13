import { Schema, default as mongoose } from 'mongoose';


const agencySchema = new Schema({
  agencyCode: {
    type: String,
    required: true,
  },
  agencyName: {
    type: String,
    required: true,
  },
  agencyAddress: {
    type: String,
    required: true,
  },
  agencyPhone: {
    type: String,
    required: true,
  },
  agencyEmail: {
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

const Agency = mongoose.model('Agency', agencySchema);
export default Agency;

