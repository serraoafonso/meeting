const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

const userRouter = require('./routes/userRouter');
const messageRouter = require('./routes/messageRouter');
const meetsRouter = require('./routes/meetsRouter');
const friendsRouter = require('./routes/friendsRouter');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

// Configuração do CORS
const allowedOrigins = [
    'http://localhost:5173',
    'https://meeting-snowy-two.vercel.app',
    process.env.BACKEND_URL
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true // Permite o envio de cookies
}));

// Configuração do Cloudinary
cloudinary.config({ 
    cloud_name: 'dfwgurj36', 
    api_key: '512959348558868', 
    api_secret: process.env.API_SECRET
});

// Configuração do multer-storage-cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',  // Pasta onde os arquivos serão armazenados no Cloudinary
        format: async (req, file) => 'jpg',  // ou 'png', etc.
        public_id: (req, file) => Date.now() + '-' + file.originalname // Nome do arquivo no Cloudinary
    },
});

const upload = multer({ storage: storage });

// Rota de upload usando multer e Cloudinary
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

// Exemplo de teste de upload direto
cloudinary.uploader.upload('C:/fotos/teste.jpg', function(error, result) {
    if (error) {
        console.error('Erro ao fazer upload:', error);
    } else {
        console.log('Upload bem-sucedido:', result);
    }
});

// Rotas
app.use('/api/user', userRouter);
app.use('/api/message', messageRouter);
app.use('/api/meets', meetsRouter);
app.use('/api/friends', friendsRouter);

// Inicia o servidor
app.listen(port, () => console.log(`Server running at ${port}`));
