const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
    enum: ['Plumbing', 'Car Repair', 'Cleaning','Electrician','painting'], 
  },
  requestedDateTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'cancelled'],
    default: 'pending',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
