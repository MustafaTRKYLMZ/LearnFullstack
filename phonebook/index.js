const http = require('http')
const express = require('express')
const app = express()
app.use(express.json())

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.delete('/api/persons/:id', (request, response) => {
  const id =Number(request.params.id)
 persons =persons.filter((person)=>person.id !==id)
response.status(204).end()
})

app.get('/api/persons/:id', (request, response) => {
  const id =Number(request.params.id)
  const person=persons.find(person => person.id ===id)
 
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.post('/api/persons', (request, response) => {
  const person =request.body
  console.log("body",person)
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id)) 
    : 0

person.id=maxId + 1

if(!person.name || !person.number){
  return response.status(400).json({error: 'name or number is missing'})
  
}  

persons.forEach((prsn)=>{
  if(prsn.name ===person.name){
    return response.status(400).json({ error: 'name must be unique' })
  }
})
 persons = persons.concat(person)
  console.log(person)
 return response.json(person)

})

app.get('/info', (request, response) => {
  const entry =persons.length
  const date = new Date()

    response.send(`<div>
      <div>Phobebook has info for ${entry} people\n\n</div>
      <div>${date}</div>
      </div>`)
 


})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)