const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;
const express = require('express');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRouter');
const messageRouter = require('./routes/messageRouter');
const meetsRouter = require('./routes/meetsRouter');
const app = express();
const cors = require('cors');

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: 'http://localhost:5173/',
    credentials: true
}))

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
app

app.use('/api/user', userRouter);
app.use('/api/message', messageRouter);
app.use('/api/meets', meetsRouter);

app.listen(port, ()=>console.log(`Server running at ${port}`))
