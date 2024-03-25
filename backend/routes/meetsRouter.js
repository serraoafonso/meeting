const express = require('express');
const meetsRouter = express.Router();
const {createMeet, getMeets, joinMeet, deleteMeet, editMeet, getAllMeets} = require('../controllers/meetsControllers');

meetsRouter.post('/create/:userId', createMeet);
meetsRouter.get('/get/:userId', getMeets);
meetsRouter.post('/join/:userId', joinMeet);
meetsRouter.delete('/delete/:meetId', deleteMeet);
meetsRouter.put('/edit/:meetId', editMeet);
meetsRouter.get('/getAll', getAllMeets)

module.exports = meetsRouter;