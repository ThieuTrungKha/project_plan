const { default: mongoose } = require("mongoose");

const invitationSchema = new mongoose.Schema({
    planId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'plans',
        required: true
    },
    emailMember: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
})

const InvitationModel = mongoose.model('invitations', invitationSchema)

module.exports = InvitationModel