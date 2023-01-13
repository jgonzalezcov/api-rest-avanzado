const app = require('./server')
app.use('/', require('./src/routes/jewelryRoutes'))
module.exports = app
