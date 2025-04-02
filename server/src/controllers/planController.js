const asyncHandler = require('express-async-handler');
const planModel = require('../model/planModel')
const listPlanModel = require('../model/listPlanModel')
const taskModel = require('../model/taskModel')
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

// const checkPlan = asyncHandler(async (req, res) => {
//     const planData = await planModel.find({ idUser: req.user.id });

//     if (planData.length === 0) {
//         console.log('Plan not found');
//         return res.status(404).json({ message: 'Plan not found' });
//     }

//     for (let plan of planData) {
//         let planStatus = true;

//         const listPlanData = await listPlanModel.find({ planId: plan._id });

//         if (listPlanData.length === 0) {
//             console.log('List plan not found');
//             continue;
//         }

//         const tasksPerList = await Promise.all(
//             listPlanData.map(list => taskModel.find({ listPlanId: list._id }))
//         );

//         for (let listTaskData of tasksPerList) {
//             if (listTaskData.some(task => task.statusTask === false)) {
//                 planStatus = false;
//                 break;
//             }
//         }

//         if (plan.statusPlan !== planStatus) {
//             await planModel.findByIdAndUpdate(plan._id, { statusPlan: planStatus });
//         }
//     }

//     res.status(200).json({ message: 'Plans status updated' });
// });



const checkPlan = asyncHandler(async (req, res) => {
    const planData = await planModel.find({ idUser: req.user.id });

    if (planData.length === 0) {
        console.log('Plan not found');
        return res.status(404).json({ message: 'Plan not found' });
    }

    for (let plan of planData) {
        const listPlanData = await listPlanModel.find({ planId: plan._id });

        if (listPlanData.length === 0) {
            console.log(`List plan not found for plan ${plan._id}`);
            continue;
        }
        const tasksPerList = await Promise.all(
            listPlanData.map(list => taskModel.find({ listPlanId: list._id }))
        );

        let hasFalseTask = tasksPerList.some(listTaskData =>
            listTaskData.some(task => task.statusTask === false)
        );

        if (plan.statusPlan !== !hasFalseTask) {
            await planModel.findByIdAndUpdate(plan._id, { statusPlan: !hasFalseTask });
        }
    }

    res.status(200).json({ message: 'Plans status updated' });
});




module.exports = {
    createPlan,
    getPlan,
    authenticateJWT,
    checkPlan
}