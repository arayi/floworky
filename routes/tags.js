const express = require('express')
const router = express.Router()

router.get( '/', ( request, response ) => {
  const Tag = request.app.get( 'models' ).Tag
})

router.post( '/', ( request, response ) => {

})

router.put( '/:id', ( request, response ) => {

})

router.delete( '/:id', ( request, response ) => {

})


module.exports = router
