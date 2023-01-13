const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.static('public'))
app.use(cors())
app.use(express.json())
const CsbInspector = require('csb-inspector')
CsbInspector()
require('dotenv').config()
/**********************************Levanta el Servidor***************************************/
app.listen(process.env.PORT, () => {
  console.log('El servidor esta activo en el puerto', process.env.PORT)
})
module.exports = app
