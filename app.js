require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cookieParser(process.env.COOKIE_SECRET || 'secret'));

app.use(cors())
app.use(express.json());

const indexRouter = require('./routes/indexRouter');
const usersRouter = require('./routes/usersRouter');
const tasksRouter = require('./routes/tasksRouter');

app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/tasks', tasksRouter);

mongoose.connect(process.env.MONGODB_ATLAS).then(() => {
  console.log('MONGODB CONNECTED');
  app.listen(process.env.PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${process.env.PORT}`);
    console.log(`CONNECTING TO MONGO DB...`);
  })
}).catch((error) => {
  console.log('MONGODB CONNECTION ERROR:: ', error.message);
});
