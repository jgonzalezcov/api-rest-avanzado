const { getJewelry, getFilterJewelry } = require('../models/jewelryModel')
const { validateQuery, validateFilter } = require('../helpers/validate')

const hateoasGet = (jewelrys, page) => {
  const results = jewelrys.map((j) => {
    return {
      name: j.name,
      href: `http://localhost:3000/jewelry/filters?id=${j.id}`,
    }
  })
  const jewelrysTotal = jewelrys.length
  const stockTotal = jewelrys
    .map((item) => item.stock)
    .reduce((prev, curr) => prev + curr, 0)
  const hateoas = {
    jewelrysTotal,
    stockTotal,
    page,
    results,
  }
  return hateoas
}

const getAllJewelry = async (req, res) => {
  const queryStrings = req.query
  try {
    const resp = await validateQuery(queryStrings)
    if (resp.status == 200) {
      const Jewelrys = await getJewelry(queryStrings)
      const hateoas = await hateoasGet(
        Jewelrys.rows,
        parseInt(queryStrings.page)
      )

      res.json(hateoas)
    } else {
      res.status(resp.status).json({ message: resp.text })
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Error al obtener los datos' })
  }
}

const filterJewelry = async (req, res) => {
  const queryStrings = req.query
  try {
    const resp = await validateFilter(queryStrings)
    if (resp.status == 200) {
      const Jewelrys = await getFilterJewelry(queryStrings)
      res.json(Jewelrys)
    } else {
      res.status(resp.status).json({ message: resp.text })
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Error al filtrar datos' })
  }
}

module.exports = {
  getAllJewelry,
  filterJewelry,
}
