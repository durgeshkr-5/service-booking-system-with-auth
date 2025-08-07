const User = require('../model/user.model');
const Booking = require('../model/booking.model');



// update booking status by admin (approve booking)
const approveBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    if(!bookingId) {
      return res.status(400).json({ msg: "Booking ID is required" });
    }

    // Find the booking 
   const booking  = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ msg: "Booking not found or Invalid booking ID" });
    }       

    booking.status = 'approved'; 
    const updatedBooking = await booking.save(); 

    return res.status(200).json({ msg: "Booking approved successfully", booking: updatedBooking });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}
// update booking status by admin (reject booking)
const rejectBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    if(!bookingId) {
      return res.status(400).json({ msg: "Booking ID is required" });
    }

    // Find the booking 
   const booking  = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ msg: "Booking not found or Invalid booking ID" });
    }       

    booking.status = 'rejected'; 
    const updatedBooking = await booking.save(); 

    return res.status(200).json({ msg: "Booking rejected successfully", booking: updatedBooking });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}


// delete booking by admin
const deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    if(!bookingId) {
      return res.status(400).json({ msg: "Booking ID is required" });
    }

    // Find the booking 
   const deletedBooking  = await Booking.findByIdAndDelete(bookingId);
    if (!deletedBooking) {
      return res.status(404).json({ msg: "Booking not found or Invalid booking ID" });
    }        

    return res.status(200).json({ msg: "Booking deleted successfully" ,deletedBooking});
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}



module.exports = {
  approveBooking,
  rejectBooking,
  deleteBooking
};