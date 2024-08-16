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

async function deleteRequest(idSend, idReceive){
  const q = "DELETE FROM relationships WHERE idReceiveRequest = ? AND idSendRequest = ?";
  const response = await db.execute(q, [idReceive, idSend]);
  return response;
}

async function sentOrReceived(myId, hisId){
  console.log(myId, hisId)
  const q = "SELECT * FROM relationships WHERE idSendRequest = ? AND idReceiveRequest = ? AND status = 'false'";

  const enviei = await db.execute(q, [myId, hisId])
  if(enviei[0].length > 0){
    return 'enviei';
  }

  const recebi = await db.execute(q, [hisId, myId]);
  if(recebi[0].length > 0 ){
    return 'recebi';
  }

  return 'nada'
}

module.exports = {
  getFriends,
  sendRequest,
  checkUserFriend,
  getRequests,
  acceptRequest,
  deleteRequest,
  sentOrReceived
};
