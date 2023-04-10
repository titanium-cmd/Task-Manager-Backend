const User = require('../models/user');
const { errorHandler, encryptPassword, comparePasswords, createAccessToken } = require('../utils');

const addUser = async (req, res) => {
  try {
    const password = await encryptPassword({ password: req.body.password });
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
    console.log(token);
    res.cookie('adriot_token', token, {
      maxAge: 86400000, // cookie expires in 1 day
      httpOnly: true,
      signed: true,
      secure: true
    });
    user = await User.findOne({ email_address }).select('-password');
    res.status(200).json({ success: true, message: 'User login successful', user });
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
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    const token = createAccessToken({
      user_id: user._id,
      email_address: user.email_address,
    });
    return res.status(200).json({ success: true, message: "User updated successfully", user, token });
  } catch (error) {
    const message = errorHandler(error);
    return res.status(400).json({ success: false, message })
  }
}

const changeUserPassword = async (req, res) => {
  try {
    const { email_address, password } = req.body;
    const user = await User.findOne({ email_address });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email address" });
    } else {
      const new_password = await encryptPassword({ password });
      await User.findByIdAndUpdate(user._id, { password: new_password });
      return res.status(200).json({ success: true, message: "User password successfully" });
    }
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
  userLogin,
  changeUserPassword
}