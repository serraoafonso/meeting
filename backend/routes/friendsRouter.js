const express = require('express');
const { getFriends, sendRequest } = require('../controllers/friendsControllers');
const friendsRouter = express.Router();

friendsRouter.get('/getFriends/:username', getFriends)
friendsRouter.post('/sendRequest', sendRequest)

module.exports = friendsRouter;