require('dotenv/config');
const express = require('express');
const cors = require('cors');
const userRouter = require('./src/routers/userRoute');
const productRouter = require('./src/routers/productRoute');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}));

app.use(express.json());
app.use('/api', userRouter);
app.use('/api', productRouter);

app.get('/', (req, res) => {
    res.send('Hello from home page');
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

app.listen(PORT, HOST, () => {
    console.log('server is running at port: http://' + HOST + ':' + PORT);
});
