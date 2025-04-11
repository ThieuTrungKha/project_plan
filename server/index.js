
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const authRouter = require('./src/routers/authRouter');
const connectDB = require('./src/config/connectdb');
const errorMiddleHandler = require('./middlewares/errorMiddleware');
const planRoute = require('./src/routers/planRoute');
const listPlanRoute = require('./src/routers/listPlanRoute');
const taskRouter = require('./src/routers/taskRouter');
const userRouter = require('./src/routers/userRouter');
const { scheduleNotifications } = require('./src/service/cronService');
const permissionRouter = require('./src/routers/UserPermissionsRouter');
const app = express();
//process.env.PORT ||
const PORT = 3001;
app.use(cors());

app.use(express.json());

app.use('/auth', authRouter)
app.use('/plan', planRoute)
app.use('/listplan', listPlanRoute)
app.use('/task', taskRouter)
app.use('/user', userRouter)
app.use('/permission', permissionRouter)

app.get('/hello', (req, res) => {
    res.send('Server is running!');
});
connectDB()
app.use(errorMiddleHandler)
scheduleNotifications();
app.listen(PORT, (err) => {
    if (err) {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
        return
    }
    console.log('Server is running on port' + PORT);
});