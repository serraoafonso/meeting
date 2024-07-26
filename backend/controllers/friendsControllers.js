const friendsModels = require('../models/friendsModels');

async function getFriends(req, res){
  const {username} = req.params;

  try{
    const response = await friendsModels.getFriends(username);
    if(!response){
        return res.status(404).json(response);
    }else{
        return res.status(200).json(response);
    }
  }catch(err){
    return res.status(404).json(err);
  }
}

async function sendRequest(req, res){
  const {idSend, idReceive} = req.body;

  try{
    const response = await friendsModels.sendRequest(idSend, idReceive);
    if(!response){
      return res.status(400).json(response);
    }else{
      return res.status(200).json(response);
    }
  }catch(err){
    return res.status(404).json(err);
  }
}

async function getRequests(req, res){
    const {id} = req.params;

    try{
      const response = await friendsModels.getRequests(id);
      if(!response){
        return res.status(400).json(response);
      }else{
        return res.status(200).json(response);
      }
    }catch(err){
      return res.status(404).json(err);
    }
}  

module.exports= {
  getFriends,
  sendRequest,
  getRequests
}