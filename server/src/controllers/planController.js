const asyncHandler = require('express-async-handler');
const planModel = require('../model/planModel')
const jwt = require('jsonwebtoken')

const secretkey = process.env.SECRET_KEY

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Valid token required' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, secretkey);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

const createPlan = asyncHandler(async (req, res) => {
    try {
        const planData = {
            ...req.body,
            idUser: req.user.id
        }
        const newPlanData = new planModel(planData)
        const savePlan = await newPlanData.save()
        res.status(200).json({
            message: 'Create plan success',
            data: savePlan
        })
    } catch (error) {
        res.status(500).json({ message: 'Error creating plan' })
    }

})


const getPlan = asyncHandler(async (req, res) => {
    try {
        const listPlanData = await planModel.find({ idUser: req.user.id })
        res.status(200).json({
            message: 'Get plan success',
            data: listPlanData
        })
    } catch (error) {

    }
})


module.exports = {
    createPlan,
    getPlan,
    authenticateJWT,
}