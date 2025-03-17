const asyncHandler = require('express-async-handler');
const planModel = require('../model/planModel')
const jwt = require('jsonwebtoken')

const secretkey = "thieutrungkha"

const createPlan = asyncHandler(async (req, res) => {
    const planData = req.body
    const header = req.headers.authorization
    const token = header && header.split(" ")[1];
    const decode = jwt.verify(token, secretkey)
    planData.idUser = decode.id

    const newPlanData = new planModel(planData)
    const savePlan = await newPlanData.save()
    res.status(200).json({
        message: 'Create plan success',
        data: savePlan
    })

})
module.exports = {
    createPlan
}