const model = require('../models/user')
const ENV = require('dotenv')
ENV.config()

const jwt = require('jsonwebtoken')

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

class UserController {
  static login(req,res) {
    let logged = ""

    client.verifyIdToken({
      idToken : req.body.id_token,
      audience : process.env.CLIENT_ID 
    })

      .then((response) => {
        logged = response.payload
        return model.findOne({ email: logged.email })
      })

      .then((data) => {
        if (data) {
          const payload = {
            id: data._id,
            email: data.email
          }

          const token = jwt.sign(payload, process.env.JWTSECRET)

          res.status(200).json({
            token: token
          })
        } else {
          model.create({
            firstName: logged.given_name,
            lastName: logged.family_name,
            email: logged.email,
          })

          .then((data) => {
            res.status(201).json({
              message: 'user created',
              token: jwt.sign({
                id: logged.id,
                email: logged.email
              }, process.env.JWTSECRET), 
              data: data
            })
          })
        }
      })

      .catch((err) => {
        res.status(500).json({
          message: err.message
        })
      })
  }
}

module.exports = UserController