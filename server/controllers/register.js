const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const bcrypt = require("bcrypt")
const { users } = new PrismaClient()
require('dotenv').config()

router.post('/', async (req, res) => {
    try {
        const { first_name, last_name, username, email, password } = req.body;
        await users.create({
            data: {
                first_name,
                last_name,
                username,
                email,
                password: await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT)),
                created_at: new Date(),
            },
        })
        res.status(200).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

module.exports = router
