const userModels = require("../models/userModels");
const { getFriends } = require('../models/friendsModels')

async function enterGoogle(req, res){
  const {username, email, name, profilePic} = req.body;
  //console.log(username,email,name,profilePic)
console.log('a')

  try{
    const { response, token } = await userModels.enterGoogle(username, email, name, profilePic)

    if(!response) return res.status(403);

    const {username_users, name_users, email_users, profilePic_users, id_users} = response[0]

    return res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ username: username_users, email: email_users, name: name_users, profilePic: profilePic_users, id: id_users });
  }catch(err){
    return res.status(404).json(err);
  }
}

async function register(req, res) {
  const { username, password, email, name } = req.body;

  let profilePic = "http://localhost:5173/src/assets/imgs/user.png"

  try {
    const { data, token } = await userModels.register(
      username,
      name,
      password,
      email,
      profilePic
    );
    if (!data) return res.status(403);
     
    const buscaId = await userModels.getUser(username);
    const id = buscaId.id_users;
    
    return res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ username, email, name, profilePic, id });
  } catch (err) {
    return res.status(404).json(err);
  }

}

async function login(req, res) {
  const { primeiro, password } = req.body;
  try {
    const response = await userModels.login(primeiro, password);

    if (!response) return res.status(404).json(response);
    if (response?.token == null || response?.token == undefined)
      return res.status(404).json(response);

    const {username_users, name_users, email_users, profilePic_users, id_users} = response?.data

    return res
      .cookie("accessToken", response?.token, {
        httpOnly: true,
      })
      .status(200)
      .json({username: username_users, name: name_users, email: email_users, profilePic: profilePic_users, id: id_users});
  } catch (err) {
    return res.status(404).json(err);
  }
}

async function editUser(req, res) {
  const { username, name, email, profilePic, bio, age } = req.body;
  const {id} = req.params;
  try {
    const response = await userModels.editUser(
      username,
      name,
      id,
      email,
      profilePic,
      bio,
      age
    );
    if (!response) return res.status(404).json(response);
    return res.status(200).json({username, name, id, email, profilePic});
  } catch (err) {
    console.log(err)
    return res.status(404).json(err);
    
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const response = await userModels.deleteUser(id);

    if (!response) return res.status(404).json(response);

    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(404).json(err);
  }
}

async function getAllUsers(req, res) {
  try {
    const response = await userModels.getAllUsers();
    if (!response) return res.status(404).json(response);
    return res.status(200).json(response[0]);
  } catch (err) {
    return res.status(404).json(err);
  }
}

async function getUser(req, res){
  const {username} = req.params;
  try{
    const response = await userModels.getUser(username);
    if (!response){
      console.log(err)
      return res.status(404).json(response);
    } else{
      let obj = {
        ...response,
        friends: []
      }
      let resp = await getFriends(username);
      resp.forEach(pessoa => {
        if(pessoa.amigo1 != username){
          obj.friends.push(pessoa.amigo1)
        }else{
          obj.friends.push(pessoa.amigo2)
        }
      })
      console.log(obj)
      return res.status(200).json(obj);
    }

  } catch (err) {
    console.log(err)
    return res.status(404).json(err);
    
  }
}

module.exports = {
  register,
  login,
  editUser,
  deleteUser,
  getAllUsers,
  enterGoogle,
  getUser
};
