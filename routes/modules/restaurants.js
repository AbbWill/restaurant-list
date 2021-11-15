const express = require('express')

const router = express.Router()

const Restaurant = require('../../models/restaurant')



router.get('/new', (req, res) => {
  return res.render('new')
 })


 router.post('/', (req, res) => {
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


router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
  .lean()
  .then((restaurants) => res.render('show', {restaurants}))
  .catch(error => console.log('show error!!!!!'))
  })


router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
  .lean()
  .then((restaurants) => res.render('edit', {restaurants}))
  .catch(error => console.log('edit error!!'))
  })


router.put('/:id', (req, res) => {
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


router.delete('/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
    .then(restaurants => restaurants.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log('error...'))
  })



// // search
// router.get('/search', (req, res) => {
//   const keyword = req.query.keyword
//   const searchRestaurants = restaurantsList.results.filter((restaurant) => {
//     return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
//   })

//   res.render('index', { restaurants: searchRestaurants, keyword: keyword })
// })

// // show 
// router.get('/:_id', (req, res) => {
//   const id = req.params.id
//   // console.log('restaurants._id', req.params.restaurant_id)
//   const restaurant = restaurantsList.results.filter(restaurant => restaurant.id.toString() === req.params.restaurant_id)

//   res.render('show', {restaurant: restaurant[0]})
// });




module.exports = router