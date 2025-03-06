
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const authRouter = require('./src/routers/authRouter');
const connectDB = require('./src/config/connectdb');
const errorMiddleHandler = require('./middlewares/errorMiddleware');
const app = express();
app.use(cors());

const port = 3001;
app.use(express.json());

app.use('/auth', authRouter)
app.get('/hello', (req, res) => {
    res.send('Server is running!');
});
connectDB()
app.use(errorMiddleHandler)

app.listen(port, (err) => {
    if (err) {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
        return
    }
    console.log('Server is running on port http://localhost:' + port);
});