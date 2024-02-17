const express = require('express');
const meetsRouter = express.Router();
const {createMeet, getMeets, joinMeet, deleteMeet, editMeet} = require('../controllers/meetsControllers');

meetsRouter.post('/create/:userId', createMeet);
meetsRouter.get('/get/:userId', getMeets);
meetsRouter.post('/join/:userId', joinMeet);
meetsRouter.delete('/delete/:meetId', deleteMeet);
meetsRouter.put('/edit/:meetId', editMeet);

module.exports = meetsRouter;