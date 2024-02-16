const db = require('../models/connection');

async function createMeet(userId, title, desc, max){
    const q  = "INSERT INTO meeting (idUser_meeting, maxNumber_meeting, title_meeting, description_meeting) VALUES (?, ?, ?, ?)";
    const response = await db.execute(q, [userId, max, title, desc]);
    return response;
}

async function getMeets(userId){
    const q = "SELECT * FROM meeting WHERE idUser_meeting = ?";
    const response = await db.execute(q, [userId]);
    return response;
}

module.exports = {
    createMeet,
    getMeets
}