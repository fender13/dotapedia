const router = require('express').Router()
const controller = require('../controllers/liveStream')

router.get('/videos', controller.getVideoLiveId)

module.exports = router