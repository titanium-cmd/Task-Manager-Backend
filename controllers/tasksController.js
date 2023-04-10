const Task = require('../models/task');
const { errorHandler } = require('../utils');

const addTask = async (req, res) => {
  try {
    const { user_id } = req.user;
    await Task.create({ ...req.body, assigned_to: user_id });
    return res.status(201).json({ success: true, message: 'Task created successfully' })
  } catch (error) {
    const message = errorHandler(error);
    return res.status(400).json({ success: false, message })
  }
}

const getAllTasks = async (req, res) => {
  try {
    const { user_id } = req.user;
    let tasks;
    if (req.params.status === 'all') {
      tasks = await Task.find({assigned_to: user_id});
    } else {
      tasks = await Task.find({ status: req.params.status, assigned_to: user_id })
    }
    return res.status(200).json({ success: true, tasks });
  } catch (error) {
    const message = errorHandler(error);
    return res.status(400).json({ success: false, message })
  }
}

const updateTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndUpdate(id, req.body);
    return res.status(200).json({ success: true, message: 'Task updated successfully' })
  } catch (error) {
    const message = errorHandler(error);
    return res.status(400).json({ success: false, message })
  }
}

const deleteTaskById = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: 'Task deleted successfully' })
  } catch (error) {
    const message = errorHandler(error);
    return res.status(400).json({ success: false, message })
  }
}

module.exports = {
  addTask,
  updateTaskById,
  deleteTaskById,
  getAllTasks
}