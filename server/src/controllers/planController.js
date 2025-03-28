const asyncHandler = require('express-async-handler');
const planModel = require('../model/planModel')
const jwt = require('jsonwebtoken');
const { createData, getData } = require('../service/crudService');

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
    const planData = {
        ...req.body,
        idUser: req.user.id
    }
    await createData(planData, planModel, 'Create plan success', 'Create plan failed', res)
})


const getPlan = asyncHandler(async (req, res) => {
    getData('idUser', req.user.id, planModel, 'Get plan success', 'Get plan failed', res)
})


module.exports = {
    createPlan,
    getPlan,
    authenticateJWT,
}