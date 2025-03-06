const Router = require('express')
const { register, login, verifycation } = require('../controllers/authController')

const authRouter = Router()
authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/verify', verifycation)

module.exports = authRouter