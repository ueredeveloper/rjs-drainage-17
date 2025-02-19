const url = 'https://njs-drainage-ueredeveloper.replit.app';

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
async function fetchShape(shape) {

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

    //  Tipo de poço na forma antiga 1 - Manual e 2 - Tubular
    //      opções neste sistema
    //          1 - Manual e (antigo 1)
    //          2 - Tubular Raso (antigo 1)
    //          3 - Tubular Profundo (antito 2)
    let _tp_id = (tp_id === 1 || tp_id === 2) ? 1 : 2;

    let response = await fetch(url + `/findPointsInASystem?tp_id=${_tp_id}&lat=${lat}&lng=${lng}`, {
        method: 'GET',
        headers: {
            Accept: 'application/JSON',
            'Content-Type': 'application/JSON',
        }

    }).then(res => {
        return res.json();
    })

    console.log('find points in a system ', response)
    return response;
}



export { findPointsInsidePolygon, findPointsInsideRectangle, findPointsInsideCircle, findPointsInASystem, fetchShape }