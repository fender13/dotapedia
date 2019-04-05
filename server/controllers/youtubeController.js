const axios = require('axios')
const _axios = axios.create({
    baseURL : `https://www.googleapis.com/youtube/v3`
})

module.exports = {
    getVideos(req, res) {
        _axios
            .get(`/search?part=snippet&q=tutorial%20dota2%20${req.params.search}&type=video&key=${process.env.YOUTUBE_API}`)
            .then(({ data })=> {
                res.status(200).json(data.items)
            })
            .catch(({ response })=> {
                res.status(500).json({
                    message: response
                })
            })
    }
}
