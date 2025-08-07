const express = require('express');
const {approveBooking,
  rejectBooking,
  deleteBooking} = require('../controllers/admin.controller');


const adminRouter = express.Router();

adminRouter.put('/bookings/:id/approve', approveBooking);
adminRouter.put('/bookings/:id/reject', rejectBooking);
adminRouter.delete('/bookings/:id', deleteBooking);




module.exports = adminRouter;