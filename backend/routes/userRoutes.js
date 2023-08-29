const {Router} = require('express')
const router = Router()
const {
  loginUser,
  signupUser
} = require('../controller/userController')

router
    .route('/login')
    .post(loginUser)

router
    .route('/signup')
    .post(signupUser)


module.exports = router