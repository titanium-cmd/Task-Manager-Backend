const express = require('express');
const router = express.Router();
const { addUser, getAllUsers, updateUserById, deleteUserById } = require('../controllers/usersController')

router.post('/', addUser);

router.get('/', getAllUsers);

router.patch('/:id', updateUserById);

router.delete('/:id', deleteUserById);

module.exports = router;
