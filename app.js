require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/indexRouter');
const usersRouter = require('./routes/usersRouter');
const tasksRouter = require('./routes/tasksRouter');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/tasks', tasksRouter);

app.listen(process.env.PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${process.env.PORT}`);
  console.log(`CONNECTING TO MONGO DB...`);
  mongoose.connect(process.env.MONGODB_ATLAS).then(() => {
    console.log('MONGODB CONNECTED');
  }).catch((error) => {
    console.log('MONGODB CONNECTION ERROR:: ', error.message);
  });
})
