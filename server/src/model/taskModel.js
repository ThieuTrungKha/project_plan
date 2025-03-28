const { default: mongoose } = require('mongoose')

const SubTaskSchema = new mongoose.Schema({
    content: { type: String, required: true },
    status: { type: Boolean }
});
const TaskSchema = new mongoose.Schema({
    backgroundUri: {
        type: String
    },
    headerColor: {
        type: String
    },
    taskInfo: {
        type: String,
        required: true
    },
    taskDescription: {
        type: String
    },
    deadline: {
        type: Date
    },
    file: {
        type: String
    },
    subTask: { type: [SubTaskSchema], default: [] },
    note: {
        type: [String],
        default: []
    },
    statusTask: {
        type: Boolean,
    },
    listPlanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'plans',
        required: true
    }
})

const TaskModel = mongoose.model('tasks', TaskSchema)

module.exports = TaskModel