const express = require('express');
const messageRouter = express.Router();
const {createMessage, deleteMessage, getAllMessages} = require('../controllers/messageControllers');

messageRouter.post('/create/:id', createMessage)
messageRouter.delete('/delete/:idMessage', deleteMessage);
messageRouter.get('/getMessages/:idSend', getAllMessages);

module.exports = messageRouter;