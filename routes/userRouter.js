const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

router.get('/', userController.list)
router.post('/', userController.create)
router.get('/:id', userController.show)
router.patch('/:id', userController.update)
router.delete('/:id', userController.delete)

module.exports = router