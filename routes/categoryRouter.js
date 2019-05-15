const express = require('express')
const router = express.Router()

const categoryController = require('../controllers/categoryController')

router.get('/', categoryController.list)
router.post('/', categoryController.create)
router.get('/:id', categoryController.show)
router.delete('/:id', categoryController.delete)

module.exports = router