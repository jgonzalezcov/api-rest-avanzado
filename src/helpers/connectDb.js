const { Pool } = require('pg')
const format = require('pg-format')
const credentials = require('../config/postgressql')
const pool = new Pool(credentials)
module.exports = { pool, format }
