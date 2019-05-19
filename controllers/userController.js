const User = require('../models/User');

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
            const user = req.body
            const signedInUser = await User.findOne({email: user.email})
            res.json(signedInUser)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}

module.exports = userController