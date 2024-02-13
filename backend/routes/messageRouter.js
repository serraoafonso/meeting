const express = require('express');
const messageRouter = express.Router();
const {createMessage, deleteMessage, getAllMessages, editMessage} = require('../controllers/messageControllers');

messageRouter.post('/create/:id', createMessage)
messageRouter.delete('/delete/:idMessage', deleteMessage);
messageRouter.get('/getMessages/:idSend', getAllMessages);
messageRouter.put('/edit/:idMessage', editMessage);

module.exports = messageRouter;