import { Schema, model } from 'mongoose';

const ReservationSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  partySize: {
    type: Number,
    required: true,
  },
  guestInfo: {
    type: Object,
    properties: {
      name: { type: String, required: true},
      email: { type: String, required: true},
      phone: { type: String, optional: true },
    },
  },
  table: {
    type: Schema.Types.ObjectId,
    ref: 'Table',
  },
  event:{
    type:String,
    required: true,
    enum: ['lunch', 'breakfast', 'dinner']
  },
  status: {
    type: String,
    enum: ['Confirmed', 'Arrived', 'Completed', 'Cancelled'],
    default: 'Confirmed',
  },
  specialRequests: {
    type: String,
    optional: true, 
  },
});

export const Reservation = model('Reservation', ReservationSchema);
