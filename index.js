const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

morgan.token('person', function (req, res) { return req.body.name || req.body.number ? JSON.stringify(req.body) : ''})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

let persons = require('./db.json')

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
    const number = `Phonebook has info for ${persons.length} people<br/>`
    response.send(number.concat(`${new Date(Date.now())}`))
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})

const generateId = () => {
    return Math.floor(Math.random() * 1000000).toString()
}
  
app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }
    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }
    if (persons.map(person => person.name).includes(body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
  
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
  
    persons = persons.concat(person)
  
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    console.log(id)
    const personEntry = persons.find(person => person.id === id)
    if (personEntry !== undefined) {
        persons = persons.filter(person => person.id !== id)
        response.status(204).end()
    }
    else {
        response.status(404).end()
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})