const db = require('./connection');
const bcrypt = require('bcrypt');

async function register(username, name, password, email){

     const salt = bcrypt.genSaltSync(10);
     const hashed_password = bcrypt.hashSync(password, salt);

     const q = "INSERT INTO users (username_users, email_users, name_users, password_users) VALUES (?,?,?,?)";

     const res = await db.execute(q, [username, email, name, hashed_password]);
     return res;
}

async function login(primeiro, password){
    try{
        const q = "SELECT * FROM users WHERE username_users = ? OR email_users = ?";
        const data = await db.execute(q, [primeiro, primeiro])

        if(data.length < 1){
            throw new Error('Username or email incorrect');
        }
        return data;

    }catch(err){
        throw new Error(err)
    }
}

module.exports = {
    register,
    login
}