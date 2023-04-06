const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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

const user = mongoose.model('user', userSchema);
module.exports = user;