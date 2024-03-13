const db = require('./connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

async function enterGoogle(username, email, name, profilePic){
  const q = "SELECT * FROM users WHERE email_users = ? AND loginGoogle_users = 'true'";

  const [response] = await db.execute(q, [email]);
  console.log(response)

  if(response.length > 0){//se o user ja existir

    const token = jwt.sign({username: username}, process.env.ACCESS_TOKEN, {expiresIn: '48h'});

    return {response, token}
    
  }else{//cria novo user com google
    
    const q = "INSERT INTO users (username_users, email_users, name_users, profilePic_users, loginGoogle_users) VALUES (?,?,?,?,'true')";

    const response = await db.execute(q, [username, email, name, profilePic]);

    const token = jwt.sign({username: username}, process.env.ACCESS_TOKEN, {expiresIn: '48h'})

     return {response, token};
  }
}

async function register(username, name, password, email, profilePic, googleUser){

     const salt = bcrypt.genSaltSync(10);
     const hashed_password = bcrypt.hashSync(password, salt);

     const q = "INSERT INTO users (username_users, email_users, name_users, password_users, profilePic_users, loginGoogle_users) VALUES (?,?,?,?,?,?)";

     const response = await db.execute(q, [username, email, name, hashed_password, profilePic, googleUser]);

     const token = jwt.sign({username: username}, process.env.ACCESS_TOKEN, {expiresIn: '48h'})

     return {response, token};
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

        const {password_users, ...outros} = data[0][0]

        if(!checkPassword){
            throw new Error('Password incorret');
        }else{
          const token = jwt.sign({username: data[0][0].username_users}, process.env.ACCESS_TOKEN, {expiresIn: '48h'})//este token apenas serve para verificar, nao contem dados relevantes
          return {token, data: outros}

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
    getAllUsers,
    enterGoogle
}