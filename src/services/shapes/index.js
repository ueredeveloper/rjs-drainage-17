const url = 'https://njs-drainage-ueredeveloper.replit.app';
//const url = 'https://ec96a2d0-8ba3-41ec-9211-9dbcf7faee95-00-1dq8pdj62qrea.hacker.replit.dev'

/**
 * Função assíncrona que encontra pontos dentro de um polígono.
 * @param {Object} polygon - Objeto representando um polígono.
 * @returns {Promise<Array>} - Uma Promise que resolve para uma matriz de pontos dentro do polígono.
 */
async function findPointsInsidePolygon(polygon) {

  let points = await fetch(url + '/findPointsInsidePolygon', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(polygon)
  }).then(response => {
    return response.json();
  })

  return points;
}
/**
 * Função assíncrona que encontra pontos dentro de um círculo.
 * @param {Object} circle - Objeto representando um círculo.
 * @returns {Promise<Array>} - Uma Promise que resolve para uma matriz de pontos dentro do círculo.
 */
async function findPointsInsideCircle(circle) {

  let points = await fetch(url + '/findPointsInsideCircle', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(circle)
  }).then(response => {
    return response.json();
  })

  return points;
}
/**
 * Função assíncrona que encontra pontos dentro de um retângulo.
 * @param {Object} rectangle - Objeto representando um retângulo.
 * @returns {Promise<Array>} - Uma Promise que resolve para uma matriz de pontos dentro do retângulo.
 */
async function findPointsInsideRectangle(rectangle) {
  let points = await fetch(url + '/findPointsInsideRectangle', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rectangle)
  }).then(response => {
    return response.json();
  })

  return points;
}
/**
* Buscar a shape solicitada no servidor
* @param shape Pode ser os valores 'hidrogeo_fraturado' ou 'hidrogeo_poroso'
*
  */
async function getShape(shape) {

  let response = await fetch(url + `/getShape?shape=${shape}`, {
    method: 'GET',
    headers: {
      Accept: 'application/JSON',
      'Content-Type': 'application/JSON',
    }

  }).then(res => {
    return res.json();
  })
  return response;
}
/**
* Através de uma coordenada buscar todos os pontos no sistema (fraturado ou poroso) ao qual pertence a coordenada. 
* @param {integer} tp_id Tipo de poço em análise, se tubular ou manual.
* @param {float} lat Latitude.
* @para {float} lng Longitue.
*
  */
async function findPointsInASystem(tp_id, lat, lng) {

  let response = await fetch(url + `/findPointsInASystem?tp_id=${tp_id}&lat=${lat}&lng=${lng}`, {
    method: 'GET',
    headers: {
      Accept: 'application/JSON',
      'Content-Type': 'application/JSON',
    }

  }).then(res => {
    return res.json();
  })
  return response;
}
/**
* Buscar a shape solicitada no servidor
* @param shape Pode ser os valores 'hidrogeo_fraturado' ou 'hidrogeo_poroso'
*
  */
async function getUsers(us_nome, us_cpf_cnpj, doc_sei, proc_sei) {

  console.log('getUsuarios')
  let response = await fetch(url
    + `/azure/getUsuarios?us_nome=${us_nome}&us_cpf_cnpj=${us_cpf_cnpj}&doc_sei=${doc_sei}&proc_sei=${proc_sei}`, {
    method: 'GET',
    mode: "cors",
    headers: {
      Accept: 'application/JSON',
      'Content-Type': 'application/JSON',
    }

  }).then(res => {
    return res.json();
  })
  return response;
}
/** 
* Buscar as demandas de vazões de acordo com o usuário solicitado.
*/
async function findDemands(end_id) {

  let response = await fetch(url + `/azure/getDemandas?end_id=${end_id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/JSON',
      'Content-Type': 'application/JSON',
    }

  }).then(res => {
    return res.json();
  })

  return response;
}


export { findPointsInsidePolygon, findPointsInsideRectangle, findPointsInsideCircle, getShape, findPointsInASystem, getUsers, findDemands }