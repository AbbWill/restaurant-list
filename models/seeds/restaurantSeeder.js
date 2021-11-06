const restaurantList = require('../../restaurants.json')
const Restaurant = require('../restaurant')

const db = require('../../config/mongoose')

// const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })


db.once('open', () => {
  Restaurant.create(restaurantList.results)

  console.log('seeder done!')
})