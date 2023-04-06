const User = require('../models/user');
const { errorHandler, encryptPassword } = require('../utils');

const addUser = async (req, res) => {
  try {
    const password = encryptPassword({ password: req.body.password });
    await User.create({ ...req.body, password });
    return res.status(201).json({ success: true, message: "User created successfully" })
  } catch (error) {
    const message = errorHandler(error);
    return res.status(400).json({ success: false, message })
  }
}

const userLogin = async (req, res) => {
  try {
    const { email_address, password } = req.body;
    let user = await User.findOne({ email_address })
    if (!user)
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    const isMatch = comparePasswords({ encrypted_password: user.password, raw_password: password });
    if (!isMatch)
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    const token = createAccessToken({
      user_id: user._id,
      email_address: user.email_address,
    });
    user = await User.findOne({ email_address }).select('-password');
    return res.status(200).json({ success: true, message: 'User login successful', token, user });
  } catch (error) {
    const message = errorHandler(error);
    return res.status(400).json({ success: false, message })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ success: true, users });
  } catch (error) {
    const message = errorHandler(error);
    return res.status(400).json({ success: false, message })
  }
}

const updateUserById = async (req, res) => {
  try {

  } catch (error) {
    const message = errorHandler(error);
    return res.status(400).json({ success: false, message })
  }
}

const deleteUserById = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    return res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    const message = errorHandler(error);
    return res.status(400).json({ success: false, message })
  }
}

module.exports = {
  addUser,
  updateUserById,
  deleteUserById,
  getAllUsers,
  userLogin
}