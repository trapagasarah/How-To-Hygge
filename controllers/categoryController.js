const Category = require('../models/Category')
const HyggeItem = require('../models/HyggeItem')

const categoryController = {
    list: async (req, res) => {
        try {
            const categories = await Category.find()
            res.json(categories)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    show: async (req, res) => {
        try {
            const categoryId = req.params.id
            const category = await Category.findById(categoryId)
            res.json(category)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    create: async (req, res) => {
        try {
            const newCategory = req.body
            const savedCategory = await Category.create(newCategory)
            res.json(savedCategory)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    delete: async (req, res) => {
        try {
            const categoryId = req.params.id
            const deletedCategory = await Category.findByIdAndRemove(categoryId)
            res.json(deletedCategory)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    patch: async (req, res) => {
        try {
            const categoryId = req.params.id
            const updatedCategory = req.body
            const savedCategory = await Category.findByIdAndUpdate(categoryId, updatedCategory)
            res.json(savedCategory)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    items: async  (req, res) => {
        try {
            const category = decodeURIComponent(req.params.category)
            console.log(category)
            const items = await HyggeItem.find({category: category})
            res.json(items)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}

module.exports = categoryController