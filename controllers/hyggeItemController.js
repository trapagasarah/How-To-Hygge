const HyggeItem = require('../models/HyggeItem')

const hyggeItemController = {
    list: async (req, res) => {
        try {
            const hyggeItems = await HyggeItem.find()
            res.json(hyggeItems)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    show: async (req, res) => {
        try {
            const hyggeItemId = req.params.id
            const hyggeItem = await HyggeItem.findById(hyggeItemId)
            res.json(hyggeItem)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    create: async (req, res) => {
        try {
            const newHyggeItem = req.body
            const savedHyggeItem = await HyggeItem.create(newHyggeItem)
            res.json(savedHyggeItem)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    update: async (req, res) => {
        try {
            const hyggeItemId = req.params.id
            const updatedHyggeItem = req.body
            const savedHyggeItem = await HyggeItem.findByIdAndUpdate(hyggeItemId, updatedHyggeItem, {new: true})
            res.json(savedHyggeItem)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    delete: async (req, res) => {
        try {
            const hyggeItemId = req.params.id
            const deletedHyggeItem = await HyggeItem.findByIdAndRemove(hyggeItemId)
            res.json(deletedHyggeItem)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}

module.exports = hyggeItemController