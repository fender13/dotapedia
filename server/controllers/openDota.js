const axios = require('axios');

const _axios = axios.create({
  baseURL: 'https://api.opendota.com/api'
});

const helper = require('../helpers/helper');

const {
  getRelevantHeroStats,
  groupHeroesByAttr
} = helper;

module.exports = {

  getProPlayers(req, res){
    _axios
      .get('/proPlayers')
      .then(({ data }) => {
        res.status(200).json({message: 'FETCH OK', data});
      })
      .catch((err) => {
        res.status(500).json({message: err.message});
      })
  },

  getHeroes(req, res) {
    _axios
      .get('/heroStats')
      .then(({ data }) => {
        const stats = getRelevantHeroStats(data)
        console.log(groupHeroesByAttr(stats))
        res.status(200).json({message: 'FETCH OK', stats});
      })
      .catch((err) => {
        res.status(500).json({message: err.message});
      })
  }



}