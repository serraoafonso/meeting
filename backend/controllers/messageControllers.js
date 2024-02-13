const messageModels = require("../models/messageModels");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

async function createMessage(req, res) {
  const token = req?.cookies?.accessToken;
  if (!token) return res.status(404).json("There is no token");
  if (!jwt.verify(token, process.env.ACCESS_TOKEN))
    return res.status(404).json("Token invalid");

  const { id } = req.params;
  const { idReceive, message } = req.body;
  try {
    const response = await messageModels.createMessage(id, idReceive, message);
    if (!response) return res.status(404).json(response);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(404).json(err);
  }
}

async function deleteMessage(req, res) {
  const token = req?.cookies?.accessToken;
  if (!token) return res.status(404).json("There is no token");
  if (!jwt.verify(token, process.env.ACCESS_TOKEN))
    return res.status(404).json("Token invalid");

  const { idMessage } = req.params;
  try {
    const response = await messageModels.deleteMessage(idMessage);
    if (!response) return res.status(404).json(response);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(404).json(err);
  }
}

async function getAllMessages(req, res) {
  const { idSend } = req.params;
  const { idReceive } = req.body;
  try {
    const response = await messageModels.getAllMessages(idSend, idReceive);
    if (!response) return res.status(404).json(response);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(200).json(err);
  }
}

async function editMessage(req, res) {
  const token = req?.cookies?.accessToken;
  if (!token) return res.status(404).json("There is no token");
  if (!jwt.verify(token, process.env.ACCESS_TOKEN))
    return res.status(404).json("Token invalid");

  const { idMessage } = req.params;
  const { message } = req.body;

  try{
    const response = await messageModels.editMessage(idMessage, message);
    if (!response) return res.status(404).json(response);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(200).json(err);
  }
}

module.exports = {
  createMessage,
  deleteMessage,
  getAllMessages,
  editMessage
};
