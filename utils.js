const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config();

const errorHandler = (err) => {
  const { message, code, errors } = err;
  let errorMessage = '';
  if (message.includes('validation failed')) {
    if (errors.length > 0) {
      console.log(errors[0]);
      errorMessage = errors[0].properties.message;
    }
  }
  if (code === 11000) {
    errorMessage = `${Object.values(err.keyValue)[0]} already exists`
  }

  return errorMessage;
}

const comparePasswords = ({ raw_password, encrypted_password }) => {
  return bcrypt.compareSync(raw_password, encrypted_password);
}

const encryptPassword = async ({ password }) => {
  console.log('password', password);
  const salt = await bcrypt.genSaltSync(10);
  console.log('password', password, salt);
  const encryptedPassword = await bcrypt.hashSync(password, salt);
  console.log(encryptedPassword);
  return encryptedPassword;
}

const createAccessToken = (payload) => {
  return jwt.sign({ payload }, process.env.JWT_KEY, {
    expiresIn: "72h",
  });
};

module.exports = {
  createAccessToken,
  encryptPassword,
  comparePasswords,
  errorHandler
}
