const express = require('express');
const router = express.Router()

const Controller = require('../controllers/openDota');

const {
  getProPlayers,
  getHeroes

} = Controller;
 

router.get('/pro', getProPlayers);
router.get('/heroes/', getHeroes)

module.exports = router;
