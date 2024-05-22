const meetsModels = require('../models/friendsModels');

async function getFriends(req, res){
  const {username} = req.params;

  try{
    const response = await meetsModels.getFriends(username);
    if(!response){
        return res.status(404).json(response);
    }else{
        return res.status(200).json(response);
    }
  }catch(err){
    return res.status(404).json(err);
  }
}

module.exports= {
  getFriends
}