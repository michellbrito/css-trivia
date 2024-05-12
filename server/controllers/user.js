const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const { users } = new PrismaClient()

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    if (req.session.userId !== id) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    const user = await users.findUnique({
      where: {
        id: parseInt(id)
      },
      select: {
        first_name: true,
        last_name: true,
        username: true,
        email: true
      }
    })
    res.status(200).json(user)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to retrieve data' })
  }
})

module.exports = router
