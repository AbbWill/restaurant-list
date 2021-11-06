const express = require('express')
const app = express()
const port = 3000
const restaurantsList = require('./restaurants.json')
// require express-handlebars here
const exphbs = require('express-handlebars')

const methodOverride = require('method-override')

const Restaurant = require('./models/restaurant')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})


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
// 首頁路由
app.get('/', (req, res) => { 
  Restaurant.find()
  .lean()
  .sort({ _id: 'asc'})
  .then(restaurants => res.render('index', { restaurants }))
  .catch(error => console.log(error))
  })

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
 })

 app.post('/restaurants', (req, res) => {
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
  .then(() => res.redirect('/')) // 新增完成後導回首頁
  .catch(error => console.log(error))
})



app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
  .lean()
  .then((restaurants) => res.render('show', {restaurants}))
  .catch(error => console.log('error!!!!!'))
  })


app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
  .lean()
  .then((restaurants) => res.render('edit', {restaurants}))
  .catch(error => console.log('error!!'))
  })

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  return Restaurant.findById(id)
  .then(restaurants => {
    restaurants.name = name
    restaurants.name_en = name_en
    restaurants.category = category
    restaurants.image = image
    restaurants.location = location
    restaurants.phone = phone
    restaurants.google_map = google_map
    restaurants.rating = rating
    restaurants.description = description
    return restaurants.save()
  })
  .then(() => res.redirect(`/restaurants/${id}`))
  .catch(error => console.log('error!!!'))
  })


app.delete('/restaurants/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
    .then(restaurants => restaurants.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log('error...'))
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
