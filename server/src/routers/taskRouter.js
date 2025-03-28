const Router = require('express')
const { authenticateJWT } = require('../controllers/planController')
const { createTask, updateStatusTask, getTask, updateTask } = require('../controllers/taskController')
const taskRouter = Router()

taskRouter.post('/createTask', authenticateJWT, createTask)
taskRouter.patch('/updateStatusTask', authenticateJWT, updateStatusTask)
taskRouter.get('/getTask', authenticateJWT, getTask)
taskRouter.patch('/updateTask', authenticateJWT, updateTask)

module.exports = taskRouter