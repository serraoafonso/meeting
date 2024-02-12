const messageModels = require('../models/messageModels');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

async function createMessage(req, res){
    const token = req?.cookies?.accessToken
    if(!token) return res.status(404).json('There is no token');
    if(!jwt.verify(token, process.env.ACCESS_TOKEN)) return res.status(404).json('Token invalid');

    const {id} = req.params;
    const {idReceive, message} = req.body;
    try{
        const response = await messageModels.createMessage(id, idReceive, message);
        if(!response) return res.status(404).json(response);
        return res.status(200).json(response);
    }catch(err){
        return res.status(404).json(err);
    }
}

module.exports = {
    createMessage
}