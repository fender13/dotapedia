const router = require('express').Router()
const controller = require('../controllers/userControllers')

router.post('/login', controller.login)

module.exports = router