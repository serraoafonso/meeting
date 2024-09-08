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
    const q = "SELECT * FROM messages WHERE (idSend_messages = ? AND idReceive_messages = ?) OR (idSend_messages = ? AND idReceive_messages = ?)";
    const response = await db.execute(q, [idSend, idReceive, idReceive, idSend]);
    return response[0];
}

async function editMessage(id, message){
    const q = "UPDATE messages SET message_messages = ? WHERE idMessage_messages = ?";
    const response = await db.execute(q, [message, id])
    return response;
}

async function getPeopleTalked(id) {
    const q = `
        SELECT DISTINCT 
            u.id_users AS idUser, 
            u.username_users AS name_user, 
            u.profilePic_users AS profilePic_user
        FROM 
            users u 
        INNER JOIN 
            messages m 
        ON 
            u.id_users = m.idSend_messages OR u.id_users = m.idReceive_messages
        WHERE 
            m.idSend_messages = ? OR m.idReceive_messages = ?;
    `;
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