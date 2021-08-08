const express = require('express')
const app = express()
const port = 3000
const restaurantsList = require('./restaurants.json')
// require express-handlebars here
const exphbs = require('express-handlebars')


// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


// css bootstrap jquery
app.use(express.static('public'))


// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantsList.results })
})


// search
app.get('/search', (req, res) => {

  const searchRestaurants = restaurantsList.results.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase())
  })

  res.render('index', { restaurants: searchRestaurants, keyword: req.query.keyword })
})


// show 
app.get("/restaurants/:restaurant_id", (req, res) => {
  // console.log('restaurant_id', req.params.restaurant_id)
  const restaurant = restaurantsList.results.filter(restaurant => restaurant.id.toString() === req.params.restaurant_id)

  res.render('show', {restaurants: restaurant[0]})
});



// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
