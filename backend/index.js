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

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", req.headers.origin); // Adiciona dinamicamente a origem da requisição
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// Configuração do CORS
const allowedOrigins = ['http://localhost:5173', 'https://meeting-snowy-two.vercel.app'];

app.use(cors({
    origin: function (origin, callback) {
        // Permite requisições apenas de origens que estão na lista de allowedOrigins
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Permite envio de cookies
    methods: 'GET,POST,PUT,DELETE', // Define os métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Define os headers permitidos
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
