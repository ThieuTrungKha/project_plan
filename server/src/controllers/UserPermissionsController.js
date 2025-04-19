const User = require('../model/userModel');
const InvitationModel = require('../model/invitationModel');
const { createData, getOneDataById } = require('../service/crudService');
const Plan = require('../model/planModel');
const PlanModel = require('../model/planModel');

const suggestion = async (req, res) => {
    const { email } = req.query
    try {
        if (!email) {
            return res.status(400).json({ message: 'Email is required' })
        }
        const result = await User.find({ email: { $regex: email, $options: 'i' } }).limit(10)

        res.status(200).json({
            message: 'find email successfully',
            data: result
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }

}
const invitation = async (req, res) => {
    const { emailMember, planId } = req.body
    try {
        if (!emailMember) {
            console.log('Email is required')
            return res.status(400).json({ message: 'Email is required' })
        }
        if (req.user.email === emailMember) {
            console.log('You cannot invite yourself')
            return res.status(400).json({ message: 'You cannot invite yourself' })
        }
        const checkInvitaionEmail = await InvitationModel.findOne({ emailMember, planId })
        if (!checkInvitaionEmail) {
            createData(req.body, InvitationModel, 'Create invitation success', 'Create invitation failed', res)
        } else {
            console.log('Email already invited')
            res.status(400).json({ message: 'Email already invited' })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }


}

const getInvitation = async (req, res) => {
    const query = {
        emailMember: req.user.email,
        status: false
    };

    let data = [];

    try {
        const invitations = await InvitationModel.find(query);

        if (!invitations || invitations.length === 0) {
            return res.status(400).json({ message: 'No invitation found' });
        }

        for (let i = 0; i < invitations.length; i++) {
            const invitation = invitations[i];

            const plan = await Plan.findById(invitation.planId);
            if (!plan) {
                console.log(`Plan not found for id: ${invitation.planId}`);
                continue;
            }

            const user = await User.findById(plan.idUser);
            if (!user) {
                console.log(`User not found for id: ${plan.idUser}`);
                continue;
            }

            data.push({
                planId: plan._id,
                planName: plan.planName,
                username: user.username,
            });
        }

        res.status(200).json({
            message: 'Get invitation successfully',
            data: data
        });

    } catch (error) {
        console.log('Error while getting invitation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getInvitedPlanMembers = async (req, res) => {
    const query = {
        planId: req.query.planId,
        status: false
    };
    const arrayData = [];
    console.log(query)
    const dataInvite = await InvitationModel.find(query)
    if (!dataInvite) {
        return res.status(400).json({ message: 'No invitation found' });
    }
    for (let i = 0; i < dataInvite.length; i++) {
        const invitation = dataInvite[i];
        const user = await User.findOne({ email: invitation.emailMember });
        if (!user) {
            console.log(`User not found for id: ${invitation.emailMember}`);
            continue;
        }
        arrayData.push({
            emailMember: user.email,
            username: user.username,
        })

    }

    res.status(200).json({
        message: 'Get invitation successfully',
        data: arrayData
    })

}

const getDataAdmin = async (req, res) => {
    try {
        const { planId } = req.query;

        if (!planId) {
            return res.status(400).json({ message: 'Missing planId in query' });
        }

        const planInfo = await PlanModel.findById(planId);
        if (!planInfo) {
            return res.status(404).json({ message: 'No plan found' });
        }

        const userInfo = await User.findById(planInfo.idUser);
        if (!userInfo) {
            return res.status(404).json({ message: 'No user found for the plan' });
        }

        return res.status(200).json({
            message: 'Get plan successfully',
            data: userInfo,
        });

    } catch (error) {
        console.error('Error in getDataAdmin:', error);
        return res.status(500).json({ message: 'Internal server error at get data admin' });
    }
}

const updateStatusInvitation = async (req, res) => {
    try {
        const { planId } = req.query
        const { email } = req.user

        if (!planId) {
            return res.status(400).json({ message: 'Missing planId' });
        }
        const data = await InvitationModel.findOneAndUpdate({ planId: planId, emailMember: email }, { status: true }, { new: true })
        if (!data) {
            return res.status(404).json({ message: 'No invitation found' });
        }
        return res.status(200).json({
            message: 'Update status invitation successfully',
            data: data
        })
    } catch (error) {
        console.log('erorr at update status invitation', error)
        return res.status(500).json({ message: 'Internal server error' })

    }
}
const getJoinedPlan = async (req, res) => {
    try {
        const inviteData = await InvitationModel.find({ emailMember: req.user.email, status: true });
        const listPlandata = []
        for (let i = 0; i < inviteData.length; i++) {
            const planData = await PlanModel.findById(inviteData[i].planId)
            if (!planData) {
                console.log(`Plan not found for id: ${inviteData[i].planId}`);
                continue;
            }
            listPlandata.push(planData)
        }
        res.status(200).json({
            message: 'Get plan successfully',
            data: listPlandata,
        });
    } catch (error) {
        console.log('Error in getJoinedPlan:', error);
        return res.status(500).json({ message: 'Internal server error' });

    }
}

const getPlansByUserParticipation = async (req, res) => {
    const { email } = req.user
    try {
        const userPlanData = await InvitationModel.find({ emailMember: email, status: true });
        const plans = [];
        for (let i = 0; i < userPlanData.length; i++) {
            const plan = await PlanModel.findById(userPlanData[i].planId);
            if (!plan) {
                console.log(`Plan not found for id: ${userPlanData[i].planId}`);
                continue;
            }
            plans.push(plan);
        }
        if (plans.length === 0) {
            return res.status(404).json({ message: 'No plans found for this user' });
        }
        return res.status(200).json({
            message: 'Get plans successfully',
            data: plans,
        });
    } catch (error) {
        console.log('Error in getPlansByUserParticipation:', error);
        return res.status(500).json({ message: 'Internal server error' });

    }
}


module.exports = {
    suggestion,
    invitation,
    getInvitation,
    getInvitedPlanMembers,
    getDataAdmin,
    updateStatusInvitation,
    getJoinedPlan,
    getPlansByUserParticipation
}