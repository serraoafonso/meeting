const db = require('../models/connection');

async function createMeet(userId, title, desc, max, dateCreated, dateEnd){
    const q  = "INSERT INTO meeting (idUser_meeting, maxNumber_meeting, title_meeting, description_meeting, dateCreated_meeting, dateEnd_meeting) VALUES (?, ?, ?, ?, ?, ?)";
    const response = await db.execute(q, [userId, max, title, desc, dateCreated, dateEnd]);
    return response;
}

async function getMeets(userId){
    const q = "SELECT * FROM meeting_users_view WHERE id_users = ?";
    const response = await db.execute(q, [userId]);
    return response;
}

async function joinMeet(userId, meetId){
    const q = "INSERT INTO meet_data (idMeeting, id_join) VALUES (?, ?)";
    const response = await db.execute(q, [meetId, userId]);
    return response
}

async function deleteMeet(meetId){
    const q = "DELETE FROM meeting WHERE meetId_meeting = ?";
    const response = await db.execute(q, [meetId]);
    return response;
}

async function editMeet(meetId, title, desc, max){
    const q  = "UPDATE meeting SET title_meeting = ?, maxNumber_meeting = ?, description_meeting = ? WHERE meetId_meeting = ?";
    const response = await db.execute(q, [title, max, desc, meetId]);
    return response;
}

async function getAllMeets(){
    const q = "SELECT * FROM meeting_users_view";
    const response = await db.execute(q);
    return response[0]
}

async function getPeopleinMeeting(idMeet){
    const q = "SELECT * FROM peopleinmeeting WHERE meetId_meeting = ?";
    const response = await db.execute(q, [idMeet]);
    return response[0] 
}

module.exports = {
    createMeet,
    getMeets,
    joinMeet,
    deleteMeet,
    editMeet,
    getAllMeets,
    getPeopleinMeeting
}