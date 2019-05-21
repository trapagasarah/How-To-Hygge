const User = require('../models/User');

const CLIENT_ID = process.env.NODE_HOW_TO_HYGGE_GOOGLE_CLIENT_ID
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

const userController = {
    list: async (req, res) => {
        try {
            const users = await User.find({})
            res.json(users)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    show: async (req, res) => {
        try {
            const userId = req.params.id
            const user = await User.findById(userId)
            res.json(user)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    create: async (req, res) => {
        try {
            const newUser = req.body
            const savedUser = await User.create(newUser)
            res.json(savedUser)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    update: async (req, res) => {
        try {
            const userId = req.params.id
            const updatedUser = req.body
            const savedUser = await User.findByIdAndUpdate(userId, updatedUser, {new: true})
            res.json(savedUser)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    delete: async (req, res) => {
        try {
            const userId = req.params.id
            const deletedUser = await User.findByIdAndRemove(userId)
            res.json(deletedUser)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }, 
    signIn: async (req, res) => {
        try {
            const token = req.body.token
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: CLIENT_ID
            });
            const payload = ticket.getPayload();
            const userId = payload.sub;



            let signedInUser = await User.findOne({id: userId})
            if(signedInUser === null) {
                console.log('User does has not signed in yet. Creating new account')
                signedInUser = await User.create({
                    id: userId,
                    email: payload.email, 
                    name: payload.name, 
                    hyggeItems: []
                })
            }
            console.log(signedInUser)
            res.json(signedInUser)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}

module.exports = userController