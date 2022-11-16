const express = require('express')
const request = require('request-promise')

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())

app.get('/api', (req, res) => {
    res.send('Hello world!')
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))