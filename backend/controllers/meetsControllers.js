const meetModels = require("../models/meetsModels");
const friendsModels = require("../models/friendsModels")
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

async function createMeet(req, res) {
  const token = req?.cookies?.accessToken;
  if (!token) return res.status(400).json("There is no token");
  if (!jwt.verify(token, process.env.ACCESS_TOKEN))
    return res.status(400).json("Token invalid");

  const { userId } = req.params;
  const { title, description, maxNumber, dateCreated, dateEnd } = req.body;

  try {
    const response = await meetModels.createMeet(
      userId,
      title,
      description,
      maxNumber,
      dateCreated,
      dateEnd
    );
    if (!response) return res.status(404).json(response);
    return res.status(200).json(response);
    
  } catch (err) {
    return res.status(404).json(err);
  }
}

async function getMeets(req, res) {
  const token = req?.cookies?.accessToken;
  if (!token) return res.status(400).json("There is no token");
  if (!jwt.verify(token, process.env.ACCESS_TOKEN))
    return res.status(404).json("Token invalid");

  const { userId } = req.params;


  try {
    const response = await meetModels.getMeets(userId);
    
    if (response.length < 1) {
      return res.status(404).json(response);
    } else {
      let dados = []
      for (const meet of response) {
        let obj = {
          ...meet,
          people: []
        };
        let resp = await meetModels.getPeopleinMeeting(meet.meetId_meeting);
        resp.forEach(pessoa => {
          obj.people.push({
            username: pessoa.username_users,
            profilePic: pessoa.profilePic_users
          });
        });
        dados.push(obj);
      }
      return res.status(200).json(dados)
    }
  } catch (err) {
    return res.status(404).json(err);
  }
}

async function getMeetsFriends(req,res){
  const token = req?.cookies?.accessToken;
  if (!token) return res.status(400).json("There is no token");
  if (!jwt.verify(token, process.env.ACCESS_TOKEN))
  return res.status(404).json("Token invalid");

  const {username} = req.params;
  console.log(username)
  let dados = [];

  try{
    const friends = await friendsModels.getFriends(username);

    const response = await meetModels.getMeetsFriends(friends, username)
    if (!response) {
      return res.status(404).json(response);
    } else {
      for (const meet of response) {
        let obj = {
          ...meet,
          people: []
        };
        let resp = await meetModels.getPeopleinMeeting(meet.meetId_meeting);
        resp.forEach(pessoa => {
          obj.people.push({
            username: pessoa.username_users,
            profilePic: pessoa.profilePic_users
          });
        });
        dados.push(obj);
      }
      return res.status(200).json(dados)
    }

  }catch(err){
    console.log(err)
    return res.status(404).json(err);
    
  }
}

async function getAllMeets(req, res) {
  let dados = [];
  try {
    const response = await meetModels.getAllMeets();
    if (!response) {
      return res.status(404).json(response);
    } else {
      for (const meet of response) {
        let obj = {
          ...meet,
          people: []
        };
        let resp = await meetModels.getPeopleinMeeting(meet.meetId_meeting);
        resp.forEach(pessoa => {
          obj.people.push({
            username: pessoa.username_users,
            profilePic: pessoa.profilePic_users
          });
        });
        dados.push(obj);
      }
      return res.status(200).json(dados)
    }
  } catch (err) {
    return res.status(404).json(err);
  }
}

async function joinMeet(req, res) {
  const token = req?.cookies?.accessToken;
  if (!token) return res.status(404).json("There is no token");
  if (!jwt.verify(token, process.env.ACCESS_TOKEN))
    return res.status(400).json("Token invalid");

  const { userId } = req.params;
  const { meetId, dateJoined } = req.body;

  try {
    const response = await meetModels.joinMeet(userId, meetId, dateJoined);
    if (!response) return res.status(404).json(response);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(404).json(err);
  }
}

async function deleteMeet(req, res) {
  const token = req?.cookies?.accessToken;
  if (!token) return res.status(400).json("There is no token");
  if (!jwt.verify(token, process.env.ACCESS_TOKEN))
    return res.status(404).json("Token invalid");

    const {meetId} = req.params;

    try {
      const response = await meetModels.deleteMeet(meetId)
      if (!response) return res.status(404).json(response);
      return res.status(200).json(response);
    } catch (err) {
      return res.staus(404).json(err);
    }
}

async function editMeet(req, res){
  const token = req?.cookies?.accessToken;
  if (!token) return res.status(400).json("There is no token");
  if (!jwt.verify(token, process.env.ACCESS_TOKEN))
    return res.status(400).json("Token invalid");

    const {meetId} = req.params;
    const {description, title, maxNumber} = req.body;

    try{
      const response = await meetModels.editMeet(meetId, title, description, maxNumber);
      if (!response) return res.status(404).json(response);
      return res.status(200).json(response)
    }catch(err){
      return res.status(404).json(err);
    }
}

async function deletePeopleinMeeting(req, res){
  const token = req?.cookies?.accessToken;
  if (!token) return res.status(400).json("There is no token");
  if (!jwt.verify(token, process.env.ACCESS_TOKEN))
    return res.status(400).json("Token invalid");

    const {meetId} = req.params;
    const {userId} = req.body;


    try{
      const response = await meetModels.deletePeopleinMeeting(userId, meetId);
      if(!response) return res.status(404).json(response);
      return res.status(200).json(response);
    }catch(err){
      return res.status(404).json(err);
    }
}


module.exports = {
  createMeet,
  getMeets,
  joinMeet,
  deleteMeet,
  editMeet,
  getAllMeets,
  deletePeopleinMeeting,
  getMeetsFriends
};
