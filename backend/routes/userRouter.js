const express = require('express');
const userRouter = express.Router();
const {register, login, editUser, deleteUser, getAllUsers} = require('../controllers/userControllers');

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.put('/edit/:id', editUser);
userRouter.delete('/delete/:id', deleteUser);
userRouter.get('/getAllUsers', getAllUsers)

module.exports = userRouter