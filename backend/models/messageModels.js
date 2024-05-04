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

async function editMessage(id, message){
    const q = "UPDATE messages SET message_messages = ? WHERE idMessage_messages = ?";
    const response = await db.execute(q, [message, id])
    return response;
}

async function getPeopleTalked(id){
    const q = "SELECT u.id_users AS idUser, u.username_users AS name_user, u.profilePic_users AS profilePic_user, m.idMessage_messages AS last_message_id, m.message_messages AS last_message FROM users u INNER JOIN messages m ON u.id_users = m.idSend_messages OR u.id_users = m.idReceive_messages WHERE m.idMessage_messages = ( SELECT MAX(idMessage_messages) FROM messages WHERE idSend_messages = ? OR idReceive_messages = ?) ORDER BY last_message_id DESC;"
    const response = await db.execute(q, [id, id]);
    return response[0];
}

module.exports = {
    createMessage,
    deleteMessage,
    getAllMessages,
    editMessage,
    getPeopleTalked
}