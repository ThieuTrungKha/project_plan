const listPlanModel = require('../model/listPlanModel')
const { createData, getData } = require('../service/crudService')
const asyncHandler = require('express-async-handler')
const taskModel = require('../model/taskModel')

const createListPlan = asyncHandler(async (req, res) => {
    const listPlanData = {
        ...req.body,
    }
    await createData(listPlanData, listPlanModel, 'Create list plan success', 'Create list plan failed', res)
})
const getListPlan = asyncHandler(async (req, res) => {
    try {
        const planId = req.query.planId
        const listPlanData = await listPlanModel.find({ planId: planId })
        let idListPlans = []
        for (let i = 0; i < listPlanData.length; i++) {
            idListPlans.push(listPlanData[i]._id)
        }
        const tasks = await taskModel.find({ listPlanId: { $in: idListPlans } });
        console.log('tasks', tasks);
        res.status(200).json({
            message: 'Get list plan success',
            data: { listPlanData, tasks }

        })
        if (!planId) {
            return res.status(400).json({ message: 'Invalid input' })
        }

    } catch (error) {
        console.log('Error getting data:', error);

    }
})


module.exports = {
    createListPlan,
    getListPlan
}
// try {
//     const newData = new listPlanModel(listPlanData)
//     const saveData = await newData.save()
//     res.status(200).json({
//         message: 'messageSuccess',
//         data: saveData
//     })
// } catch (error) {
//     console.log('Error creating data:', error);
//     res.status(500).json({ message: messageErorr })
// }