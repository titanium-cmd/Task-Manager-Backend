const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const indexRouter = require('./routes/indexRouter');
const usersRouter = require('./routes/usersRouter');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(process.env.PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${process.env.PORT}`);
})
