const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const { triviaTopics, triviaOptions } = new PrismaClient()

router.get('/topics', async (req, res) => {
  try {
    const allTriviaTopics = await triviaTopics.findMany({})
    res.status(200).json(allTriviaTopics)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to retrieve data' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const triviaQuestion = await triviaOptions.findMany({
      where: {
        trivia_question_id: parseInt(id)
      },
      include: {
        trivia_question: {
          select: {
            question_text: true
          }
        }
      }
    })
    res.status(200).json(triviaQuestion)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to retrieve data' })
  }
})

module.exports = router
