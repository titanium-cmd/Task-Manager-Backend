const express = require('express');
const router = express.Router();
const { addUser, getAllUsers, updateUserById, deleteUserById, userLogin } = require('../controllers/usersController');
const { usersAuthMiddleware } = require('../middlewares/authMiddleware');

router.post('/', addUser);

router.post('/login', userLogin);

router.get('/', usersAuthMiddleware, getAllUsers);

router.put('/:id', usersAuthMiddleware, updateUserById);

router.delete('/:id', usersAuthMiddleware, deleteUserById);

module.exports = router;
