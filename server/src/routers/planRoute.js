const Router = require('express')
const { createPlan, getPlan, authenticateJWT } = require('../controllers/planController')
const planRoute = Router()


planRoute.post('/createPlan', authenticateJWT, createPlan)
planRoute.get('/getPlan', authenticateJWT, getPlan)
module.exports = planRoute