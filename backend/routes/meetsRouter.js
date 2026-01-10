const express = require('express');
const meetsRouter = express.Router();
const {createMeet, getMeets, joinMeet, deleteMeet, editMeet, getAllMeets, deletePeopleinMeeting, getMeetsFriends} = require('../controllers/meetsControllers');
const {validateCreateMeet, validateEditMeet} = require('../middleware/validation');

meetsRouter.post('/create/:userId', validateCreateMeet, createMeet);
meetsRouter.get('/get/:userId', getMeets);
meetsRouter.post('/join/:userId', joinMeet);
meetsRouter.delete('/delete/:meetId', deleteMeet);
meetsRouter.put('/edit/:meetId', validateEditMeet, editMeet);
meetsRouter.get('/getAll', getAllMeets)
meetsRouter.delete('/deleteUser/:meetId', deletePeopleinMeeting);
meetsRouter.get('/getMeetsFriends/:username', getMeetsFriends)

module.exports = meetsRouter;