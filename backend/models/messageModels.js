const db = require('../models/connection');

async function createMessage(idSend, idReceive, message){
    const q = "INSERT INTO messages (idSend_messages, idReceive_messages, message_messages) VALUES (?, ?, ?)"
    const response = db.execute(q, [idSend, idReceive, message])
    return response;
}

async function deleteMessage(messageId){
    const q = "DELETE FROM messages WHERE idMessage_messages = ?";
    const response = await db.execute(q, [messageId]);
    return response;
}

async function getAllMessages(idSend, idReceive){
    const q = "SELECT * FROM messages WHERE idSend_messages = ? OR idSend_messages = ? OR idReceive_messages = ? OR idReceive_messages = ?";
    const response = await db.execute(q, [idSend, idReceive, idSend, idReceive]);
    return response[0];
}

module.exports = {
    createMessage,
    deleteMessage,
    getAllMessages
}