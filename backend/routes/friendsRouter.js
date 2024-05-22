const express = require('express');
const { getFriends } = require('../controllers/friendsControllers');
const friendsRouter = express.Router();

friendsRouter.get('/getFriends/:username', getFriends)

module.exports = friendsRouter;