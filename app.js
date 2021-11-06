const express = require('express')
const app = express()
const port = 3000
const restaurantsList = require('./restaurants.json')
// require express-handlebars here
const exphbs = require('express-handlebars')

const methodOverride = require('method-override')

// const Restaurant = require('./models/restaurant')

const routes = require('./routes')

require('./config/mongoose')
// 直接require 因mongoose不需export東西 app.js也不會再用到mongoose的東西 執行1次就好

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// css bootstrap jquery
app.use(express.static('public'))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理

app.use(methodOverride('_method'))
// 只要帶上_method這個參數 method後面的內容就會轉換成使用的http方法

// routes setting 

app.use(routes)

// // search
app.get('/search', (req, res) => {

  const searchRestaurants = restaurantsList.results.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase())
  })

  res.render('index', { restaurants: searchRestaurants, keyword: req.query.keyword })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
