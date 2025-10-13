import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const DPSchema = new mongoose.Schema({
  dpName: { type: String, required: true },        // Delivery Personnel's name
  password: { type: String, required: true },      // Password (should be hashed)
  DLNumber: { type: String, required: true },      // Driver's License Number
  DLProof: { type: String, required: false },      // DL Proof (Image as a string, maybe a path or URL)
  RCNumber: { type: String, required: true },      // RC (Registration Certificate) Number
  RCProof: { type: String, required: false },      // RC Proof (Image as a string, maybe a path or URL)
  hostId: { type: mongoose.Schema.Types.ObjectId, ref: 'Host', required: true },  // Reference to Host who registered the DP
}, {
  timestamps: true  // This will add createdAt and updatedAt timestamps automatically
});

 DPSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10); // Hash password if changed or new
  }
  next();
});

const DP = mongoose.model('DP', DPSchema);
export default DP;
