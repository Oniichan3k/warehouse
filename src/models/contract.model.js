import { Schema, default as mongoose } from 'mongoose';

const contractSchema = new Schema({
  contractContent: {
    type: String,
    required: true,
  },
  contractMedia: {
    type: [String],
    required: true,
  },
});

const Contract = mongoose.model('Contract', contractSchema);
export default Contract;