const db = require('./connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

async function getFriends(username){
  const q = "SELECT * FROM relations WHERE amigo1 = ? OR amigo2 = ?";
  const response = await db.execute(q, [username, username]);
  return response[0];
}

module.exports = {
  getFriends
}