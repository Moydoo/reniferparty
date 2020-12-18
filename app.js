const port = process.env.PORT || 3000
const express = require('express')
const path = require('path')
const app = express()

app.set('json spaces', 2) // pretty print JSON

app.use(express.static(path.join(__dirname, 'public')));

const itemCount = 61
const data = Array(itemCount).fill(0).map(
  (_, index) => `box${index}`
).reduce(
  (items, item) => {
    items[item] = false
    return items
  },
  {}
)
const state = {
  oxygen: false,
  light: false,
  reactor: false,
}

app.use('/get', (req, res) => {
  res.json(data)
})

app.use('/set/:id/:value', (req, res) => {
  const { id, value } = req.params
  if (data[id] !== undefined) {
    data[id] = value === "true" || value === true
  }

  res.json(data)
})

app.use('/getstate', (req, res) => {
  res.json(state)
})

app.use('/state/:id/:value', (req, res) => {
  const { id, value } = req.params
  if (id && state[id] !== undefined) {
    state[id] = value === "true" || value === true
  }
  console.log(id, value, state)

  res.json(state)
})

app.listen(port)
