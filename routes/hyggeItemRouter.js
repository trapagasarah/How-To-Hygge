const express = require('express')
const router = express.Router()

const hyggeItemController = require('../controllers/hyggeItemController')

router.get('/', hyggeItemController.list)
router.post('/', hyggeItemController.create)
router.get('/:id', hyggeItemController.show)
router.patch('/:id', hyggeItemController.update)
router.delete('/:id', hyggeItemController.delete)

module.exports = router