// models/Reference.js
import mongoose from 'mongoose';

const ReferenceSchema = new mongoose.Schema({
  reference: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  designation: { type: String, required: true },
});

export default mongoose.models.Reference || mongoose.model('Reference', ReferenceSchema);
