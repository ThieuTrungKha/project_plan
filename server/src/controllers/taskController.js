const asyncHandler = require('express-async-handler')
const { createData, getOneDataById, updateDataById } = require('../service/crudService')
const TaskModel = require('../model/taskModel')

const createTask = asyncHandler(async (req, res) => {
    createData(req.body, TaskModel, 'Task created successfully', 'Error creating task', res)
})

const updateStatusTask = asyncHandler(async (req, res) => {
    try {
        console.log('req.query', req.query.taskId);
        const task = await TaskModel.findById(req.query.taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.statusTask = !task.statusTask;

        await task.save();

        res.status(200).json({ message: 'Task status updated successfully', task });

    } catch (error) {
        console.log('Error updating task status', error)
        res.status(500).json({ message: 'Error updating task status' })
    }
})

const getTask = asyncHandler(async (req, res) => {
    getOneDataById(TaskModel, req.query.taskId, 'Task found', 'Task not found', res)
})

const updateTask = asyncHandler(async (req, res) => {
    updateDataById(req.query.taskId, req.body, TaskModel, 'Task updated successfully', 'Error updating task', res)
})



module.exports = {
    createTask,
    updateStatusTask,
    getTask,
    updateTask
} 