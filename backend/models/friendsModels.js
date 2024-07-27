const db = require("./connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

async function getFriends(username) {
  const q = "SELECT * FROM relations WHERE amigo1 = ? OR amigo2 = ?";
  const response = await db.execute(q, [username, username]);
  return response[0];
}

async function sendRequest(idSend, idReceive) {
  const q =
    "INSERT INTO relationships (idSendRequest, idReceiveRequest) VALUES (?, ?)";
  const response = await db.execute(q, [idSend, idReceive]);
  return response;
}

async function acceptRequest(idSend, idReceive){
  const q = "UPDATE relationships SET status = 'true' WHERE idSendRequest = ? AND idReceiveRequest = ?";
  const response = await db.execute(q ,[idSend, idReceive]);
  return response;
}

async function checkUserFriend(id, idUser) {

  const q = "SELECT * FROM relationships WHERE idSendRequest = ? AND idReceiveRequest = ?";

  const res = await db.execute(q, [id, idUser]);
  if (res[0].length < 1) {

    const q = "SELECT * FROM relationships WHERE idSendRequest = ? AND idReceiveRequest = ?";

    const res = await db.execute(q, [idUser, id]);
    if (res[0].length < 1) {
      return "nofriends";
    }else if(res[0].status = "false"){
      return "received";
    }else{
      return "friend"
    }
  } else if (res[0].status = "false") {
    return "sent";
  } else {
    return "friend";
  }
}

async function getRequests(id){
  const q = "SELECT * FROM relationships WHERE idReceiveRequest = ? AND status = 'false'"
  const [response] = await db.execute(q, [id]);
  let array = [];
  for(let request of response){
    console.log(request)
    let query = "SELECT username_users, profilePic_users FROM users WHERE id_users = ?";
    let [[user]] = await db.execute(query, [request.idSendRequest]);
    console.log(user)
    let data = {...request, user}
    array.push(data)
  }
  return array
}

module.exports = {
  getFriends,
  sendRequest,
  checkUserFriend,
  getRequests,
  acceptRequest
};
