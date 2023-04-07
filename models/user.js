const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email_address: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email already exists']
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: [true, 'Username provided has been taken. Please provide another']
  },
  password: {
    type: String,
    minlength: [8, 'Password must be at least 8 characters'],
    required: [true, 'Password is required']
  },
}, { timestamps: true });

const user = mongoose.model('user', userSchema);
module.exports = user;