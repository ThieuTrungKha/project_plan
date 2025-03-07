const Router = require('express')
const { register, login, verifycation, forgotPassword } = require('../controllers/authController')

const authRouter = Router()
authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/verify', verifycation)
authRouter.post('/forgotPassword', forgotPassword)

module.exports = authRouter