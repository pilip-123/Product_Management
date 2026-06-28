require('dotenv/config');
const express = require('express');
const userRouter = require('./src/routers/userRoute');
const productRouter = require('./src/routers/productRoute');

const app = express();

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
