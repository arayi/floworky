const express = require('express')
const router = express.Router()

const { allItemsQuery, filteredItemsQuery, respondWithItems, generateBreadcrumbs } = require( './items/item_response' )
const { buildTree, buildSubTree } = require( './items/tree_creation' )
const findAllItems = require('./items/find_all_items')

router.get( '/', ( request, response ) => {
  const { Item } = request.app.get( 'models' ).Item

  const { user, query } = request

  findAllItems( Item, user, query )
    .then( generateBreadcrumbs )  //TODO respondWithItems args?? (item_response.js)
    .then( respondWithItems( response, user ) )
})

router.get( ':/item_id', ( request, response ) => {
  const Item = request.app.get( 'models' ).Item

  const { user, query } = request
  const itemId = parseInt( request.params.item_id )

  findAllItems( Item, user, query )
    .then( generateBreadcrumbs )
    .then( respondWithItems( response, user ))
})

router.post( '/', ( request, response ) => {
  const { Item } = request.app.get( 'models' )

  const { title, description, parent_id } = request.body

  Item.create({ title, description, parent_id, user_id: request.user.id })
    .then( result => response.redirect( '/items' ))
})

router.post( '/:id', ( request, response ) => {
  const Item = request.app.get( 'models' ).Item
  const { id } = request.params
  const where = { id, user_id: request.user.id }

  Item.update( Item.filterParameters( request.body ), { where })
    .then( result => response.json({ success: true, id }))
    .catch( error =>
      response.json({ success: false, id, message: error.message })
    )
})

module.exports = router
