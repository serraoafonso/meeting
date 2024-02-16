const express = require('express');
const meetsRouter = express.Router();
const {createMeet, getMeets} = require('../controllers/meetsControllers');

meetsRouter.post('/create/:userId', createMeet);
meetsRouter.get('/get/:userId', getMeets)

module.exports = meetsRouter;