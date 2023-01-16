const { pool, format } = require('../helpers/connectDb')

const getJewelry = async ({ limits = 10, order_by = 'id_ASC', page = 1 }) => {
  const [campo, direccion] = order_by.split('_')
  const offset = (page - 1) * limits
  const formattedQuery = format(
    'SELECT * FROM inventory order by %s %s LIMIT %s OFFSET %s',
    campo,
    direccion,
    limits,
    offset
  )
  try {
    {
      const result = await pool.query(formattedQuery)
      return result
    }
  } catch (e) {
    console.log(
      'Error al obtener datos de tabla inventory: ',
      e.code,
      e.message
    )
    throw new Error(e)
  }
}

const getFilterJewelry = async ({
  id,
  precio_min,
  precio_max,
  categoria,
  metal,
}) => {
  let filtros = []
  if (id) filtros.push(`id = ${id}`)
  if (precio_max) filtros.push(`price <= ${precio_max}`)
  if (precio_min) filtros.push(`price >= ${precio_min}`)
  if (categoria) filtros.push(`category = '${categoria}'`)
  if (metal) filtros.push(`metal = '${metal}'`)
  let consulta = 'SELECT * FROM inventory'
  if (filtros.length > 0) {
    filtros = filtros.join(' AND ')
    consulta += ` WHERE ${filtros}`
  }
  try {
    const { rows: jewelrys } = await pool.query(consulta)
    return jewelrys
  } catch (e) {
    console.log(
      'Error al obtener datos filtrados de tabla inventory: ',
      e.code,
      e.message
    )
    throw new Error(e)
  }
}

module.exports = {
  getJewelry,
  getFilterJewelry,
}
