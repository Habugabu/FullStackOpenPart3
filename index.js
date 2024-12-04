const express = require('express')
const app = express()

const db = require('./db.json')

app.get('/api/persons', (request, response) => {
  response.json(db)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})