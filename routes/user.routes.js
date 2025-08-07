const express = require('express');
const {createBooking,
  getUserBookings,
  updateBooking,
  deleteBooking} = require('../controllers/user.controller');


const userRouter = express.Router();

userRouter.get('/bookings', getUserBookings);
userRouter.post('/bookings', createBooking);
userRouter.put('/bookings/:id', updateBooking);
userRouter.delete('/bookings/:id', deleteBooking);


















module.exports = userRouter;