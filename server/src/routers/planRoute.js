const Router = require('express')
const { createPlan } = require('../controllers/planController')
const planRoute = Router()


planRoute.post('/createPlan', createPlan)

module.exports = planRoute