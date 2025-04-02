const Router = require('express')
const { authenticateJWT } = require('../controllers/planController')
const { getUsser, updateInfoUser, updatePassUser } = require('../controllers/userController')
const { verifyPassword } = require('../controllers/authController')

const userRouter = Router()
userRouter.get('/getUser', authenticateJWT, getUsser)
userRouter.patch('/updateUser', authenticateJWT, updateInfoUser)
userRouter.post('/verifyPassword', authenticateJWT, verifyPassword)
userRouter.patch('/updatePassword', authenticateJWT, updatePassUser)
module.exports = userRouter