const express = require('express');
const { getFriends, sendRequest, getRequests } = require('../controllers/friendsControllers');
const friendsRouter = express.Router();

friendsRouter.get('/getFriends/:username', getFriends)
friendsRouter.post('/sendRequest', sendRequest)
friendsRouter.get('/getRequests/:id', getRequests)

module.exports = friendsRouter;