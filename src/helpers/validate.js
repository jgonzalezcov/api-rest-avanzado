const { pool } = require('./connectDb')
const { bugMaster } = require('./errors')
/**********************Validaciones Get /Joyas*******************************/
validateOrder = async (field, direccion) => {
  const SQLquery = {
    text: `SELECT count(*) as num FROM information_schema.columns WHERE table_schema = 'public'AND table_name = 'inventory' AND column_name =$1`,
    values: [field],
  }
  const { rows } = await pool.query(SQLquery)

  if (direccion != 'ASC' && direccion != 'DESC') {
    return 'E3'
  } else if (rows[0].num != 1) {
    return 'E4'
  } else {
    return 'ok'
  }
}

const validateQuery = async ({ order_by, limits, page }) => {
  let result = bugMaster[0]
  if (limits) {
    if (!isNaN(limits)) {
      result = bugMaster[0]
    } else return bugMaster[1]
  }
  if (page) {
    if (!isNaN(page)) {
      result = bugMaster[0]
    } else return bugMaster[2]
  }
  if (order_by) {
    const [campo, direccion] = order_by.split('_')
    resultValidateOrder = await validateOrder(campo, direccion)
    if (resultValidateOrder === 'ok') {
      result = bugMaster[0]
    } else if (resultValidateOrder === 'E3') {
      return bugMaster[3]
    } else if (resultValidateOrder === 'E4') {
      return bugMaster[4]
    }
  }
  return result
}

/**********************Validaciones GET /joyas/filtros*******************************/
validateCategory = async (categoria) => {
  const SQLquery = {
    text: `SELECT COUNT(*) AS num FROM inventory WHERE category=$1 group by category`,
    values: [categoria],
  }
  const { rows } = await pool.query(SQLquery)
  if (rows.length == 0) {
    return 'E8'
  } else {
    return 'ok'
  }
}
validateMetal = async (metal) => {
  const SQLquery = {
    text: `SELECT COUNT(*) AS num FROM inventory WHERE metal=$1 group by metal`,
    values: [metal],
  }
  const { rows } = await pool.query(SQLquery)
  if (rows.length == 0) {
    return 'E9'
  } else {
    return 'ok'
  }
}
const validateFilter = async ({ precio_min, precio_max, categoria, metal }) => {
  let result = bugMaster[0]
  if (precio_min) {
    if (!isNaN(precio_min)) {
      result = bugMaster[0]
    } else return bugMaster[5]
  }
  if (precio_max) {
    if (!isNaN(precio_max)) {
      result = bugMaster[0]
    } else return bugMaster[6]
  }
  if (precio_min && !isNaN(precio_min)) {
    if (precio_max && !isNaN(precio_max)) {
      if (parseInt(precio_min) <= parseInt(precio_max)) {
        result = bugMaster[0]
      } else {
        return bugMaster[7]
      }
    }
  }
  if (categoria) {
    resultValidateCategroy = await validateCategory(categoria)
    if (resultValidateCategroy === 'ok') {
      result = bugMaster[0]
    } else if (resultValidateCategroy === 'E8') {
      return bugMaster[8]
    }
  }

  if (metal) {
    resultValidateMetal = await validateMetal(metal)
    if (resultValidateMetal === 'ok') {
      result = bugMaster[0]
    } else if (resultValidateMetal === 'E9') {
      return bugMaster[9]
    }
  }

  return result
}

module.exports = { validateQuery, validateFilter }
