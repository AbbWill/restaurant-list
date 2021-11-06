const restaurantList = require('../../restaurants.json')
const Restaurant = require('../restaurant')

const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  Restaurant.create(restaurantList.results)

  console.log('mongodb connected!')
})