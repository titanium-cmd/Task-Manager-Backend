const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  ride_id: {
    type: Number,
    required: true,
  },
  drivers: {
    type: Array,
    required: true
  },
  customer_socket_id: {
    type: String,
    required: true
  }
}, { timestamps: true });

const task = mongoose.model('task', taskSchema);
module.exports = task;