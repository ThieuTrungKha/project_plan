const { default: mongoose } = require('mongoose')

const PlanSchema = new mongoose.Schema({
    planName: {
        type: String,
        required: true

    },
    planDescription: {
        type: String
    },
    photoUrlBackground: {
        type: String
    },
    statusPlan: {
        type: Boolean,
        required: true,
        default: false
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },

})

const PlanModel = mongoose.model('plans', PlanSchema)

module.exports = PlanModel