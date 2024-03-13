const express = require('express');
const userRouter = express.Router();
const {register, login, editUser, deleteUser, getAllUsers, enterGoogle, getUser} = require('../controllers/userControllers');

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.put('/edit/:id', editUser);
userRouter.delete('/delete/:id', deleteUser);
userRouter.get('/getAllUsers', getAllUsers);
userRouter.post('/enterGoogle', enterGoogle);
userRouter.get('/getUser/:username', getUser);

module.exports = userRouter