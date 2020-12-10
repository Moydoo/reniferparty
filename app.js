const port = process.env.PORT || 3000
const express = require('express')
var path = require('path')
var app = express()

app.use(express.static(path.join(__dirname, 'public')));

const itemCount = 30
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

app.listen(port)
