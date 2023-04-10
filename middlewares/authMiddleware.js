require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user')

const usersAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.signedCookies.adriot_token;
    console.log('cookies: ', token);
//    const authHeader = req.headers.authorization;
    // if (!authHeader) {
    //   return res.status(401).json({ success: false, message: 'Unauthorized to access this route' })
    // }
    // const bearerToken = authHeader.split(' ')[1];
    // const { payload } = jwt.verify(bearerToken, process.env.JWT_KEY);
    // if (!payload) {
    //   return res.status(401).json({ success: false, message: 'Unauthorized to access this route' })
    // }
    // const user = await User.findById(payload.user_id);
    // if (!user)
    //   return res.status(401).json({ success: false, message: 'Unauthorized to access this route' });
    // req.user = payload;
    next();
  } catch (error) {
    const message = error.name === 'JsonWebTokenError' ? 'Unauthorized to access this route' : error.message;
    return res.status(401).json({ success: false, message });
  }
}

module.exports = { usersAuthMiddleware };