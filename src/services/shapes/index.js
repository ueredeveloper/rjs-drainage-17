// mudar para https://njs-adasa-postgres.ueredeveloper.repl.co
const url = 'https://adasa-postgres.ueredeveloper.repl.co';

export async function findPointsInsidePolygon(polygon) {

  console.log(JSON.stringify(polygon))
  let points = await fetch(url + '/findPointsInsidePolygon', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(polygon)
  }).then(response => {
    return response.json();
  })

  return points;
}
export async function findPointsInsideCircle(circle) {

  let points = await fetch(url + '/findPointsInsideCircle', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(circle)
  }).then(response => {
    return response.json();
  })

  return points;
}
export async function findPointsInsideRectangle(rectangle) {
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
export async function getShape(shape) {

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
* Através de uma coordenada buscar todos os pontos no sistema ao qual pertence a coordenada. url eg: `https://njs-adasa-postgres.ueredeveloper.repl.co/findPointsInASystem?tp_id=1&lat=-15.5334786&lng=-48.1537762`.
* @param {integer} tp_id Tipo de poço em análise, se tubular ou manual.
* @param {float} lat Latitude.
* @para {float} lng Longitue.
*
  */
export async function findPointsInASystem(tp_id, lat, lng) {
  console.log('find tp_id ', tp_id)
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