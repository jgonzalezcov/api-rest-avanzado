const bugMaster = [
  {
    status: 200,
    statusText: 'ok',
    text: 'La información se ha procesado correctamente',
  },
  {
    status: 400,
    statusText: 'error',
    text: 'El limite de registros solicitado no es numérico',
  },
  {
    status: 400,
    statusText: 'error',
    text: 'El Numero de paginas no es numérico',
  },
  {
    status: 400,
    statusText: 'error',
    text: 'El parámetro de ordenamiento no es valido',
  },
  {
    status: 400,
    statusText: 'error',
    text: 'La columna de ordenamiento no es valida',
  },
  {
    status: 400,
    statusText: 'error',
    text: 'El filtro de precio mínimo no es numérico',
  },
  {
    status: 400,
    statusText: 'error',
    text: 'El filtro de precio máximo no es numérico',
  },
  {
    status: 400,
    statusText: 'error',
    text: 'El filtro precio mínimo no puede ser mayor a precio máximo',
  },
  {
    status: 400,
    statusText: 'error',
    text: 'La categoría ingresada no es valida',
  },
  {
    status: 400,
    statusText: 'error',
    text: 'El metal ingresado no es valido',
  },
]

module.exports = { bugMaster }
