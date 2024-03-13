const userModels = require("../models/userModels");

async function enterGoogle(req, res){
  const {username, email, name, profilePic} = req.body;
  //console.log(username,email,name,profilePic)

  try{
    const { response, token } = await userModels.enterGoogle(username, email, name, profilePic)

    if(!response) return res.status(403);
    return res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ username, email, name, profilePic });
  }catch(err){
    return res.status(404).json(err);
  }
}

async function register(req, res) {
  const { username, password, email, name, profilePic, googleUser } = req.body;

  try {
    const { response, token } = await userModels.register(
      username,
      name,
      password,
      email,
      profilePic,
      googleUser
    );
    if (!response) return res.status(403);
    return res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ username, email, name, profilePic });
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

    const {username_users, name_users, email_users, profilePic_users} = response?.data

    return res
      .cookie("accessToken", response?.token, {
        httpOnly: true,
      })
      .status(200)
      .json({username: username_users, name: name_users, email: email_users, profilePic: profilePic_users});
  } catch (err) {
    return res.status(404).json(err);
  }
}

async function editUser(req, res) {
  const { username, name, email, profilePic } = req.body;
  const { id } = req.params;
  try {
    const response = await userModels.editUser(
      username,
      name,
      id,
      email,
      profilePic
    );
    if (!response) return res.status(404).json(response);
    return res.status(200).json(response);
  } catch (err) {
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

module.exports = {
  register,
  login,
  editUser,
  deleteUser,
  getAllUsers,
  enterGoogle
};
