const express = require('express');
const messageRouter = express.Router();
const {createMessage} = require('../controllers/messageControllers');

messageRouter.post('/create/:id', createMessage)

module.exports = messageRouter;