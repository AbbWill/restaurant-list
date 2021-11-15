const express = require('express')

const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => { 
  Restaurant.find()
  .lean()
  .sort({ _id: 'asc'})
  .then(restaurants => res.render('index', { restaurants }))
  .catch(error => console.log(error))
  })

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find()
    .lean()
    .then(restaurants => {
      restaurants = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase()) || restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()))
      res.render('index', { restaurants, keyword })
    })
    .catch(error => console.error(error))
})


module.exports = router