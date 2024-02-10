const userModels = require('../models/userModels');

async function register(req, res){
  const {username, password, email, name} = req.body;

  try{
    const response = await userModels.register(username, name, password, email)
    if(!response) return res.status(403)
    return res.status(200).json({username, email, name});
  }catch(err){
    return res.status(404).json(err);
  }

}

async function login(req, res){
    const {primeiro, password} = req.body;
    try{
        const response = await userModels.login(primeiro, password);
        if(!response) return res.status(404);
    }catch(err){
        return res.status(404).json(err);
    }
}

module.exports = {
    register,
    login
}