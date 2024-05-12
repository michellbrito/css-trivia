const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
const { users } = new PrismaClient()

router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await users.findUnique({
      where: {
        username
      }
    })
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!user || !isValidPassword) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }
    req.session.userId = user.id
    res.status(200).json({ message: 'Login successful' })
    await users.update({
      where: {
        username
      },
      data: {
        logged_in_at: new Date()
      }
    })
  } catch (err) {
    console.error('Error logging in:', err)
    res.status(500).json({ error: 'Failed to log in' })
  }
})

module.exports = router
