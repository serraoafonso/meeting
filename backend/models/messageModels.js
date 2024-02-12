const db = require('../models/connection');

async function createMessage(idSend, idReceive, message){
    const q = "INSERT INTO messages (idSend_messages, idReceive_messages, message_messages) VALUES (?, ?, ?)"
    const response = db.execute(q, [idSend, idReceive, message])
    return response;
}


module.exports = {
    createMessage
}