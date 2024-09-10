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
const multer = require('multer');
const friendsRouter = require('./routes/friendsRouter');

app.use(express.json());
app.use(cookieParser());


// Configuração do CORS
const allowedOrigins = ['http://localhost:5173', 'https://meeting-snowy-two.vercel.app', process.env.BACKEND_URL];

app.use(cors({
    origin: allowedOrigins,
    credentials: true // Permite o envio de cookies
}));

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, '../frontend/public/uploads');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({storage: storage});
app.use('/uploads', express.static('../frontend/public/uploads'));

app.post('/api/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
});

app.use('/api/user', userRouter);
app.use('/api/message', messageRouter);
app.use('/api/meets', meetsRouter);
app.use('/api/friends', friendsRouter);

app.listen(port, () => console.log(`Server running at ${port}`));
