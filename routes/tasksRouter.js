const express = require('express');
const router = express.Router();
const { addTask, getAllTasks, updateTaskById, deleteTaskById } = require('../controllers/tasksController');
const { usersAuthMiddleware } = require('../middlewares/authMiddleware');

router.post('/', usersAuthMiddleware, addTask);

router.get('/:status', usersAuthMiddleware, getAllTasks);

router.put('/:id', usersAuthMiddleware, updateTaskById);

router.delete('/:id', usersAuthMiddleware, deleteTaskById);

module.exports = router;
