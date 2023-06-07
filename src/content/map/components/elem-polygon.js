import { useEffect, useState } from 'react';
import { converterPostgresToGmaps } from '../../../tools';

/**
* Elemento de Polígono gmaps api.
*
*
*/
const ElemPolygon = ({ shape, map }) => {

  const [polygon, setPolygon] = useState();

  useEffect(() => {

    if (!polygon) {
      setPolygon(new window.google.maps.Polygon());
    }
    // remove marker from map on unmount
    return () => {
      if (polygon) {
        polygon.setMap(null);
      }
    };
  }, [polygon, setPolygon]);

  if (polygon) {
    // cor aleatóra para o polígono
    let color = Math.floor(Math.random() * 2 ** 24).toString(16).padStart(6, '0');
    // converter postgres 
    let paths = converterPostgresToGmaps(shape);

    polygon.setOptions(
      {
        paths: paths,
        strokeColor: '#' + color,
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: '#' + color,
        fillOpacity: 0.35,
        map: map
      }
    );
  }

  return null;

};

export default ElemPolygon;