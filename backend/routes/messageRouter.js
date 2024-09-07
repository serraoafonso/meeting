const express = require('express');
const messageRouter = express.Router();
const {createMessage, deleteMessage, getAllMessages, editMessage, getPeopleTalked} = require('../controllers/messageControllers');

messageRouter.post('/create/:id', createMessage)
messageRouter.delete('/delete/:idMessage', deleteMessage);
messageRouter.post('/getMessages/:idSend', getAllMessages);
messageRouter.put('/edit/:idMessage', editMessage);
messageRouter.get('/getTalked/:idUser', getPeopleTalked);

module.exports = messageRouter;