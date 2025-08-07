const User = require('../model/user.model');
const Booking = require('../model/booking.model');



// Create a new booking
const createBooking = async (req, res) => {
  try {
    const { serviceName, requestedDateTime } = req.body;
    const userId = req.user.userId
    if(!serviceName || !requestedDateTime) {
      return res.status(400).json({ msg: "Service name and requested date/time are required" });
    }
    // Validate serviceName
    const validServices = ['Plumbing', 'Car Repair', 'Cleaning', 'Electrician'];
    if (!validServices.includes(serviceName)) {
      return res.status(400).json({ msg: "Invalid service name" });
    }  
    // Create a new booking
    const newBooking = new Booking({
      serviceName,
      requestedDateTime,
      user: userId,
    });

    await newBooking.save();
    return res.status(201).json({ msg: "Booking created successfully", booking: newBooking });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error"});
  }
}

// Get all bookings for specific user
const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.userId;
    const bookings = await Booking.find({ user: userId });
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ msg: "No bookings found for this user" });
    }
    return res.status(200).json({ bookings });
  } catch (error) {
    return res.status(500).json({  msg: "Internal server error"});
  }
};

// Update booking if status is pending
const updateBooking = async (req, res) => { 
    try {
        const bookingId = req.params.id;
        const userId = req.user.userId;
        const {serviceName, requestedDateTime} = req.body;
    
    
        // Find the booking
        const booking = await Booking.findOne({ _id: bookingId, user: userId });
        if (!booking) {
        return res.status(404).json({ msg: "Booking not found" });
        }
    
        // Check if the booking status is pending
        if (booking.status !== 'pending') {
        return res.status(400).json({ msg: "Booking can only be updated if it is pending" });
        }
        
        if(serviceName) {
            // Validate serviceName
            const validServices = ['Plumbing', 'Car Repair', 'Cleaning','Electrician','painting'];
            if (!validServices.includes(serviceName)) {
                return res.status(400).json({ msg: "Invalid service name" });
            }
            booking.serviceName = serviceName;
        }

        if(requestedDateTime) {
            booking.requestedDateTime = requestedDate;
        }

        // Update the booking status
        await booking.save();
    
        return res.status(200).json({ msg: "Booking updated successfully", booking });
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error"});
    }
    }


    //delete booking if status is pending
const deleteBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const userId = req.user.userId;

        // Find the booking
        const booking = await Booking.findOne({ _id: bookingId, user: userId });
        if (!booking) {
            return res.status(404).json({ msg: "Booking not found" });
        }
        // Check if the booking status is pending
        if (booking.status !== 'pending') {
            return res.status(400).json({ msg: "Booking can only be deleted if it is pending" });
        }

        await Booking.deleteOne({ _id: bookingId, user: userId });
        return res.status(200).json({ msg: "Booking deleted successfully" });
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error" });
    }
};


module.exports = {
  createBooking,
  getUserBookings,
  updateBooking,
  deleteBooking
};