import mongoose from 'mongoose';

const TableSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  area: {
    type: String,
    enum: ['Indoor', 'Outdoor', 'Patio'],
    default: 'Indoor'
  }
});

export const Table = mongoose.model('Table', TableSchema);
