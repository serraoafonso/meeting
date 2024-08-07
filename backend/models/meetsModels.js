const db = require('../models/connection');

async function createMeet(userId, title, desc, max, dateCreated, dateEnd){
    const q  = "INSERT INTO meeting (idUser_meeting, maxNumber_meeting, title_meeting, description_meeting, dateCreated_meeting, dateEnd_meeting) VALUES (?, ?, ?, ?, ?, ?)";
    const response = await db.execute(q, [userId, max, title, desc, dateCreated, dateEnd]);
    return response;
}

async function getMeets(userId){
    const q = "SELECT * FROM meeting_users_view WHERE id_users = ?";
    const response = await db.execute(q, [userId]);
    return response[0];
}

async function getMeetsFriends(array, username){

    let arrayDados = [];
  
    for(let i = 0; i<array.length; i++){

        if(array[i].amigo1 != username){
            let q = "SELECT * FROM meeting_users_view WHERE username_users = ?";
            let [response] = await db.execute(q, [array[i].amigo1]);
            for(let a = 0 ; a < response.length; a++){
                arrayDados.push(response[a]);
            }
        }else{
            let q = "SELECT * FROM meeting_users_view WHERE username_users = ?";
            let [response] = await db.execute(q, [array[i].amigo2]);
            arrayDados.push(response);
            for(let a = 0 ; a < response.length; a++){
                arrayDados.push(response[a]);
            }
        }
        
    }
    return arrayDados;
}

async function joinMeet(userId, meetId, dateJoined){
    const q = "INSERT INTO meet_data (idMeeting, id_join, dateJoined) VALUES (?, ?, ?)";
    const response = await db.execute(q, [meetId, userId, dateJoined]);
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

async function deletePeopleinMeeting(idPeople, idMeet){
    const q = "DELETE FROM meet_data WHERE id_join = ? AND idMeeting = ?";
    const response = await db.execute(q, [idPeople, idMeet]);
    return response[0];
}


module.exports = {
    createMeet,
    getMeets,
    joinMeet,
    deleteMeet,
    editMeet,
    getAllMeets,
    getPeopleinMeeting,
    deletePeopleinMeeting,
    getMeetsFriends
}