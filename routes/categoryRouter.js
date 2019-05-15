const express = require('express')
const router = express.Router()

const categoryController = require('../controllers/categoryController')

router.get('/', categoryController.list)
router.post('/', categoryController.create)
router.get('/:id', categoryController.show)
router.delete('/:id', categoryController.delete)
router.get('/:category/items', categoryController.items)

module.exports = router