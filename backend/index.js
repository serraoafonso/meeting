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
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

app.use(express.json());
app.use(cookieParser());


// Configuração do CORS
const allowedOrigins = ['http://localhost:5173', 'https://meeting-snowy-two.vercel.app', process.env.BACKEND_URL];

app.use(cors({
    origin: allowedOrigins,
    credentials: true // Permite o envio de cookies
}));

/*const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, `../frontend/public/uploads`);
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname);
    }
});*/
/*app.post('/api/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
});*/

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',  // Pasta onde os arquivos serão armazenados no Cloudinary
        format: async (req, file) => 'jpg',  // ou 'png', etc. Defina o formato, ou use null para manter o formato original
        public_id: (req, file) => Date.now() + '-' + file.originalname // Nome do arquivo no Cloudinary
    },
});


cloudinary.uploader.upload(`"C:\fotos\teste.jpg"`, function(error, result) {
    if (error) {
        console.error('Erro ao fazer upload:', error);
    } else {
        console.log('Upload bem-sucedido:', result);
    }
});


cloudinary.config({ 
    cloud_name: 'dfwgurj36', 
    api_key: '512959348558868', 
    api_secret: process.env.API_SECRET // Click 'View API Keys' above to copy your API secret
});

const upload = multer({storage: storage});

app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Nenhum arquivo foi enviado.');
    }

    // O Cloudinary retornará as informações do arquivo enviado
    res.status(200).json({
        url: req.file.path,  // URL pública da imagem no Cloudinary
        filename: req.file.filename  // Nome do arquivo no Cloudinary
    });
});




app.use('/api/user', userRouter);
app.use('/api/message', messageRouter);
app.use('/api/meets', meetsRouter);
app.use('/api/friends', friendsRouter);

app.listen(port, () => console.log(`Server running at ${port}`));
