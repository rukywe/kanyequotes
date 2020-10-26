const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  const url = 'https://api.kanye.rest'
  https.get(url, function (response) {
    response.on('data', function (data) {
      const quotes = JSON.parse(data)

      const quote = quotes.quote

      res.render('kanye', { quote: quote })
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
