const express = require('express');
const router = express.Router();
const { addTask, getAllTasks, updateTaskById, deleteTaskById } = require('../controllers/tasksController')

router.post('/', addTask);

router.get('/', getAllTasks);

router.patch('/:id', updateTaskById);

router.delete('/:id', deleteTaskById);

module.exports = router;
