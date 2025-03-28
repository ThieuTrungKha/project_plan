const Router = require('express')
const { authenticateJWT } = require('../controllers/planController')
const { createListPlan, getListPlan } = require('../controllers/listPlancontroller')


const listPlanRoute = Router()

listPlanRoute.post('/createListPlan', authenticateJWT, createListPlan)
listPlanRoute.get('/getListPlan', authenticateJWT, getListPlan)

module.exports = listPlanRoute