const db = require('./connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function register(username, name, password, email, profilePic){

     const salt = bcrypt.genSaltSync(10);
     const hashed_password = bcrypt.hashSync(password, salt);

     const q = "INSERT INTO users (username_users, email_users, name_users, password_users, profilePic_users) VALUES (?,?,?,?,?)";

     const res = await db.execute(q, [username, email, name, hashed_password, profilePic]);
     return res;
}

async function login(primeiro, password){
    try{
        const q = "SELECT * FROM users WHERE username_users = ? OR email_users = ?";
        const data = await db.execute(q, [primeiro, primeiro])

        if(data.length < 1){
            throw new Error('Username or email incorrect');
        }
        
        const encryptedPassword = data[0][0]?.password_users;
        
        const checkPassword = await bcrypt.compare(password, encryptedPassword);  

        if(!checkPassword){
            throw new Error('Password incorret');
        }else{
          
        }


    }catch(err){
        throw new Error(err)
    }
}

async function editUser(username, name, id, email, profilePic){
    const q = "UPDATE users SET username_users = ?, name_users = ?, email_users = ?, profilePic_users = ? WHERE id_users = ?";
    const userFree = await checkUser(username, email);
    if(!userFree) throw new Error('User or email already registered');
    const response = await db.execute(q, [username, name, email, profilePic, id]);
    return response;
}

async function deleteUser(id){
    const q = "DELETE FROM users WHERE id_users = ?";
    const response = await db.execute(q, [id]);
    return response;
}

async function getAllUsers(){
    const q = "SELECT * FROM users"
    const response = await db.execute(q);
    return response;
}

async function checkUser(username, email){
    const q = "SELECT * FROM users WHERE username_users = ? OR email_users = ?";
    const response = await db.execute(q, [username, email]);
    if(response[0].length > 1) return false
    return true;
}

module.exports = {
    register,
    login,
    editUser,
    deleteUser,
    getAllUsers
}