const router = require('express').Router()
const controller = require('../controllers/liveStream')
const youtubeController = require('../controllers/youtubeController')
const authentication = require('../middlewares/authentications')

router.get('/videos', authentication, controller.getVideoLiveId)
router.get('/youtube/:search', authentication, youtubeController.getVideos)

module.exports = router