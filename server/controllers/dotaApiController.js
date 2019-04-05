const axios = require('axios')
const helper = require('../helpers/helper')
const _axios = axios.create({
  baseURL: 'https://api.opendota.com/api'
})

const {
  getRelevantHeroStats
} = helper

module.exports = {
  getHeroes(req, res) {
    _axios
      .get('/heroStats')
      .then(({ data }) => {
        const stats = getRelevantHeroStats(data)
        res.status(200).json({message: 'FETCH OK', stats});
      })
      .catch(({ response }) => {
        res.status(500).json({
          message: response
        });
      })
  }
}