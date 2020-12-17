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

app.use('/get', (req, res) => {
  res.json(data)
})

app.use('/set/:id/:value', (req, res) => {
  const { id, value } = req.params
  if (data[id] !== undefined) {
    data[id] = value === "true"
  }

  res.json(data)
})

app.listen(port)
