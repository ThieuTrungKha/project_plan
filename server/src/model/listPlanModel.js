const { default: mongoose } = require("mongoose");

const listPlanSchema = new mongoose.Schema({
    planListName: {
        type: String,
        required: true

    },
    planListDescription: {
        type: String
    },
    percentage: {
        type: Number
    },
    background: {
        type: String
    },
    planId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'plans',
        required: true
    }
})

const ListPlanModel = mongoose.model('listPlans', listPlanSchema)

module.exports = ListPlanModel

