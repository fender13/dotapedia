const router = require('express').Router()
const controller = require('../controllers/liveStream')
const youtubeController = require('../controllers/youtubeController')

router.get('/videos', controller.getVideoLiveId)
router.get('/youtube/:search', youtubeController.getVideos)

module.exports = router