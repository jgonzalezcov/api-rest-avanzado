const express = require('express')
const router = express.Router()
const { reportRequest } = require('../middlewares/logger')
const {
  getAllJewelry,
  filterJewelry,
} = require('../controllers/jewelryController')
router.get('/jewelry', reportRequest, getAllJewelry)
router.get('/jewelry/filters', reportRequest, filterJewelry)
router.get('*', (req, res) => {
  res.status(404).send('Esta ruta no existe')
})
module.exports = router
