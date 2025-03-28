const { default: mongoose } = require('mongoose')

const SubTaskSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
    },
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tasks'
    },
})

const SubTaskModel = mongoose.model('subTasks', SubTaskSchema)

module.exports = SubTaskModel