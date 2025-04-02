const Router = require('express')
const { createPlan, getPlan, authenticateJWT, checkPlan } = require('../controllers/planController')
const planRoute = Router()

planRoute.post('/createPlan', authenticateJWT, createPlan)
planRoute.get('/getPlan', authenticateJWT, getPlan)
planRoute.get('/checkPlan', authenticateJWT, checkPlan)

module.exports = planRoute