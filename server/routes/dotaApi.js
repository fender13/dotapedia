const express = require('express');
const router = express.Router()

const Controller = require('../controllers/dotaApiController');

const {
  getHeroes
} = Controller;

router.get('/heroes', getHeroes);

module.exports = router;
