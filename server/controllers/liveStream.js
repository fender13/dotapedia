const axios = require('axios')

const ENV = require('dotenv')
ENV.config()

const axi = axios.create({
  baseURL: 'https://api.twitch.tv/helix',
  headers: {'Client-ID': process.env.TWITCH_CLIENT_ID}
})

class LiveStreamController {
  static getVideoLiveId(req, res) {
    axi
      .get(`/streams?game_id=29595&first=10`)
        .then(({ data }) => {
          let gameData = data.data
          let gameID = []
          for (let i = 0; i < gameData.length; i++) {
            gameID.push(gameData[i].user_name)
          }
          res.status(200).json({
            data: gameID
          })
        })
        .catch(({ response }) => {
          res.status(500).json({
            message: response
          })
        })
  }
}

module.exports = LiveStreamController