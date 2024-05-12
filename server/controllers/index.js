const router = require('express').Router()
const leaderboardRoutes = require('./leaderboard')
const loginRoutes = require('./login')
const registerRoutes = require('./register')
const triviaRoutes = require('./trivia')
const userRoutes = require('./user')

router.use('/leaderboard', leaderboardRoutes)
router.use('/login', loginRoutes)
router.use('/register', registerRoutes)
router.use('/trivia', triviaRoutes)
router.use('/user', userRoutes)

module.exports = router
