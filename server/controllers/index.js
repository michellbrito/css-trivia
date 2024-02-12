const router = require('express').Router()
const leaderboardRoutes = require('./leaderboard')
const loginRoutes = require('./login')
const registerRoutes = require('./register')
const topicRoutes = require('./topic')

router.use('/leaderboard', leaderboardRoutes)
router.use('/login', loginRoutes)
router.use('/register', registerRoutes)
router.use('/topic', topicRoutes)

module.exports = router
