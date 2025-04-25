const Router = require('express')
const { authenticateJWT } = require('../controllers/planController')
const { suggestion, invitation, getInvitation, getInvitedPlanMembers, getDataAdmin, updateStatusInvitation, getJoinedPlan, getPlansByUserParticipation, getParticipantInfo, addMemberTask, getMemberTask, checkUser, checkUserTask } = require('../controllers/UserPermissionsController')
const permissionRouter = Router()

permissionRouter.get('/suggest', authenticateJWT, suggestion)
permissionRouter.post('/invitation', authenticateJWT, invitation)
permissionRouter.get('/getInvitation', authenticateJWT, getInvitation)
permissionRouter.get('/getInvited', authenticateJWT, getInvitedPlanMembers)
permissionRouter.get('/getDataAdmin', authenticateJWT, getDataAdmin)
permissionRouter.patch('/acceptInvitation', authenticateJWT, updateStatusInvitation)
permissionRouter.get('/getJoinedPlan', authenticateJWT, getJoinedPlan)
permissionRouter.get('/getPlansByUserParticipation', authenticateJWT, getPlansByUserParticipation)
permissionRouter.get('/getParticipantInfo', authenticateJWT, getParticipantInfo)
permissionRouter.post('/addMemberTask', authenticateJWT, addMemberTask)
permissionRouter.get('/getMemberTask', authenticateJWT, getMemberTask)
permissionRouter.get('/checkUser', authenticateJWT, checkUser)
permissionRouter.get('/checkUserTask', authenticateJWT, checkUserTask)



module.exports = permissionRouter