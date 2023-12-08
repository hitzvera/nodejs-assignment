const express = require('express')
const router = express.Router();

const taskRouter = require('./task.router');
const userRouter = require('./user.router');
const authRouter = require('./auth.router');

router.use(authRouter)

module.exports = router