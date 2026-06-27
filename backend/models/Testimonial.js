import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  imageUrl: { type: String },
  cloudinaryId: { type: String },
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Testimonial', testimonialSchema);
