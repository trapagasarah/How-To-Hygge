const Category = require('../models/Category')

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
    }
}

module.exports = categoryController