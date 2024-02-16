const meetModels = require('../models/meetsModels');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

async function createMeet(req, res){
    const token = req?.cookies?.accessToken;
    if (!token) return res.status(404).json("There is no token");
    if (!jwt.verify(token, process.env.ACCESS_TOKEN))
      return res.status(404).json("Token invalid");

    const {userId} = req.params;
    const {title, description, maxNumber} = req.body;

    try{
      const response = await meetModels.createMeet(userId, title, description, maxNumber) 
      if(!response) return res.status(404).json(response);
      return res.status(200).json(response);
    }catch(err){
        return res.status(404).json(err)
    }
}

async function getMeets(req, res){
    const token = req?.cookies?.accessToken;
    if (!token) return res.status(404).json("There is no token");
    if (!jwt.verify(token, process.env.ACCESS_TOKEN))
      return res.status(404).json("Token invalid");

    const {userId} = req.params;

    try{
        const response = await meetModels.getMeets(userId);
        if(!response) return res.status(404).json(err);
        return res.status(200).json(response[0])
    }catch(err){
        return res.status(404).json(err);
    }
}

module.exports = {
    createMeet,
    getMeets
}