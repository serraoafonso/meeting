const express = require('express');
const { getFriends, sendRequest, getRequests, acceptRequest, deleteRequest, sentOrReceived } = require('../controllers/friendsControllers');
const friendsRouter = express.Router();

friendsRouter.get('/getFriends/:username', getFriends)
friendsRouter.post('/sendRequest', sendRequest)
friendsRouter.get('/getRequests/:id', getRequests)
friendsRouter.put('/acceptRequest', acceptRequest);
friendsRouter.delete('/deleteRequest', deleteRequest)
friendsRouter.post('/sentOrReceived', sentOrReceived)

module.exports = friendsRouter;