const express = require('express')
const app = express()

const db = require('./db.json')

app.get('/api/persons', (request, response) => {
  response.json(db)
})

app.get('/info', (request, response) => {
    const number = `Phonebook has info for ${db.length} people<br/>`
    response.send(number.concat(`${new Date(Date.now())}`))
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = db.find(person => person.id === id)
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})