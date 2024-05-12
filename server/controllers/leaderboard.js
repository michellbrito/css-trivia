const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const { triviaSubmissions, triviaSubmissionOptions } = new PrismaClient()
const { formatDay } = require('../utils')

const currentDate = new Date()
const currentYear = currentDate.getFullYear()
const currentMonth = formatDay(currentDate.getMonth() + 1)
const currentDay = formatDay(currentDate.getDate())
const nextDay = formatDay(parseInt(currentDay) + 1)
const nextMonth = formatDay(parseInt(currentMonth) + 1)

router.post('/add', async (req, res) => {
  const { user_id, submissionOptions, score } = req.body
  try {
    const { id } = await triviaSubmissions.create({
      data: {
        user_id,
        score,
        created_at: new Date()
      }
    })
    for (let i = 0; i < submissionOptions.length; i++) {
      await triviaSubmissionOptions.create({
        data: {
          trivia_submission_id: id,
          trivia_option_id: submissionOptions[i].trivia_option_id,
          trivia_question_id: submissionOptions[i].trivia_question_id
        }
      })
    }
    res.status(200).json({ message: 'Added to leaderboard successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to retrieve data' })
  }
})

router.get('/daily', async (_req, res) => {
  try {
    const leaderboardEntries = await triviaSubmissions.findMany({
      where: {
        created_at: {
          gte: new Date(`${currentYear}-${currentMonth}-${currentDay}T00:00:00.000Z`),
          lt: new Date(`${currentYear}-${currentMonth}-${nextDay}T00:00:00.000Z`)
        }
      },
      include: {
        user: {
          select: {
            first_name: true,
            last_name: true,
            username: true
          }
        }
      },
      orderBy: [{ score: 'desc' }]
    })
    res.status(200).json(leaderboardEntries)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to retrieve data' })
  }
})

router.get('/monthly', async (_req, res) => {
  try {
    const leaderboardEntries = await triviaSubmissions.findMany({
      where: {
        created_at: {
          gte: new Date(`${currentYear}-${currentMonth}-01T00:00:00.000Z`),
          lt: new Date(`${currentYear}-${nextMonth}-01T00:00:00.000Z`)
        }
      },
      include: {
        user: {
          select: {
            first_name: true,
            last_name: true,
            username: true
          }
        }
      },
      orderBy: [{ score: 'desc' }]
    })
    res.status(200).json(leaderboardEntries)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to retrieve data' })
  }
})

router.get('/all', async (_req, res) => {
  try {
    const leaderboardEntries = await triviaSubmissions.findMany({
      include: {
        user: {
          select: {
            first_name: true,
            last_name: true,
            username: true
          }
        }
      },
      orderBy: [{ score: 'desc' }]
    })
    res.status(200).json(leaderboardEntries)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to retrieve data' })
  }
})

module.exports = router
