import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  eventType: { type: String, required: true },
  eventDate: { type: Date, required: true },
  location: { type: String, required: true },
  message: { type: String },
  status: { 
    type: String, 
    enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  isNew: { type: Boolean, default: true },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending'
  },
  paymentId: { type: String },
  // Future ready for notifications
  emailSent: { type: Boolean, default: false },
  whatsappSent: { type: Boolean, default: false },
  smsSent: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
