const express = require('express')
const router = express.Router()

const Controller = require('../controllers/dotaApiController')
const authentication = require('../middlewares/authentications')

const {
  getHeroes
} = Controller;

router.get('/heroes', authentication, getHeroes);

module.exports = router;
