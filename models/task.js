const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  assigned_to: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Task should beassigned to someone'],
    ref: 'user',
  },
  priority: {
    type: String,
    required: [true, 'Priority is required'],
    enum: {
      values: ['high', 'low', 'medium'],
      message: 'Priority should be high, low or medium'
    }
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: {
      values: ['completed', 'in-progress', 'not-started'],
      message: 'Priority should be completed, in-progress or not-started'
    },
    default: 'not-started'
  },
  due_date: {
    type: Date,
    required: [true, 'Due date is required']
  },
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  }
}, { timestamps: true });

const task = mongoose.model('task', taskSchema);
module.exports = task;