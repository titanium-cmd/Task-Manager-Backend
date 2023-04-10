const express = require('express');
const router = express.Router();
const { addTask, getAllTasks, updateTaskById, deleteTaskById } = require('../controllers/tasksController')

router.post('/', addTask);

router.get('/:status', getAllTasks);

router.put('/:id', updateTaskById);

router.delete('/:id', deleteTaskById);

module.exports = router;
