const express = require('express');
const router = express.Router();
const { addUser, getAllUsers, updateUserById, deleteUserById, userLogin, changeUserPassword } = require('../controllers/usersController');
const { usersAuthMiddleware } = require('../middlewares/authMiddleware');

router.post('/', addUser);

router.post('/login', userLogin);

router.get('/', usersAuthMiddleware, getAllUsers);

router.put('/:id', usersAuthMiddleware, updateUserById);

router.patch('/change-password', changeUserPassword);

router.delete('/:id', usersAuthMiddleware, deleteUserById);

module.exports = router;
