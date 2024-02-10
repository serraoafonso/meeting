const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;
const express = require('express');
const userRouter = require('./routes/userRouter');
const messageRouter = require('./routes/messageRouter');
const meetsRouter = require('./routes/meetsRouter');
const app = express();

app.use(express.json())

app.use('/api/user', userRouter);
app.use('/api/message', messageRouter);
app.use('/api/meets', meetsRouter);

app.listen(port, ()=>console.log(`Server running at ${port}`))
