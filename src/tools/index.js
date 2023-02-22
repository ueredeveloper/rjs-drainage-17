/**
*  Converter uma união de shapes feita na jtst com formato do gmaps api para o formato que possa ser utilizado na arcgis rest service.
*  @param {object[]} rings Array com coordenadas no formato gmaps api, ex: [{lat: -17, lng: -47},...]
*  @returns {object[]} arcGis. Array no formato Arg Gis Rest Service, ex: [[[-47...,-15...],...,[-48...,-16...]]]
*/
const gmapsToArcGis = (rings) => {
    // arcGis = [[]] => [[[-47,-16], [-47,-17], [-47,-18]]]
    let arcGis = [[]];
    rings.forEach(r => {
      // adicionar tudo na posição 0 da array.
      arcGis[0].push([r.lng(), r.lat()])
    })
    // adicionar a primeira coordenada no final do polígono para fechar completamente
    if (arcGis[0][0][0] !== arcGis[0][arcGis[0].length - 1][0]) {
      arcGis[0].push(arcGis[0][0])
    }
    return arcGis;
  }
  /**
    * Criar linhas para cada ângulo do círculo (0 a 360º) e assim construir um polígono em formato circular para buscas de outorgas.
    * @param {object} center. Latitude e longitude do centro de um círculo.
    * @param {number} radius. Raio do circulo desenhado
    * @return {array} rings. Retorna polígono em formato de círculo.
    */
  function createCircleRings(center, radius) {
    let angle = { start: 0, end: 360 }
    let rings = [];
    let i = angle.start;
    // convert metros par km
    radius = radius * 0.0000092
  
    while (i < angle.end) {
      let path = [
        { lat: center.lat, lng: center.lng },
        { lat: center.lat + (Math.sin(i * Math.PI / 180)) * radius, lng: center.lng + (Math.cos(i * Math.PI / 180)) * radius }
      ];
      // retirar a coordenada do centro, só importa a segunda de cada linha criada
      rings.push(path[1]);
      i++;
    }
    return rings;
  }
  /*
  *
    *
    */
  function converterPostgresToGmaps(shape) {
  
    if (shape.shape.type === 'MultiPolygon') {
  
      let _paths = shape.shape.coordinates.map(coord => {
        return coord[0].map(c => {
          return { lat: parseFloat(c[1]), lng: parseFloat(c[0]) }
        })
      })
      return _paths
    }
    else {
  
      let _paths = shape.shape.coordinates.map(coord => {
        return coord.map(c => {
          return { lat: parseFloat(c[1]), lng: parseFloat(c[0]) }
        })
      })
      return _paths
    }
  
  
  }
  /**
  * Abreviar valores (mil, milhares, bnilhares, ...) para mostrar na barra ( bar chart).
    * link: https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900
    */
  function nFormatter(num, digits) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function(item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
  }
  
  export { gmapsToArcGis, createCircleRings, converterPostgresToGmaps, nFormatter }