import { useEffect, useState } from 'react';

const ElemMarker = (props) => {

  const [marker, setMarker] = useState();
  /**
  * Setar o ícone do marcador.
  * @param {integer} tp_id Tipo do poço, tp_id = 1, poço manual - verde, tp_id = 2, poço tubular - azul. Se nulo, é um ponto clicado pelo usuário.
  */
  function setIcon(tp_id) {
    // yellow red
    if (tp_id === 1) {
      return `https://www.google.com/intl/en_us/mapfiles/ms/micons/green-dot.png`
    } else if (tp_id === 2) {
      return `https://www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png`
    } else if (tp_id === 3) {
      return `https://www.google.com/intl/en_us/mapfiles/ms/micons/red-dot.png`
    }
    else {
      return `https://www.google.com/intl/en_us/mapfiles/ms/micons/yellow-dot.png`
    }
  }

  useEffect(() => {

    if (!marker) {
      setMarker(new window.google.maps.Marker());
    }
    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);


  if (marker) {
    //console.log('props ', props.marker)
   // let [x, y] = props.marker.int_shape.coordinates;
   let {int_latitude, int_longitude} = props.marker;
    let position = {lat: parseFloat(int_latitude), lng: parseFloat(int_longitude)}

    marker.setOptions({options:{position: position}, icon: `https://www.google.com/intl/en_us/mapfiles/ms/micons/red-dot.png`})

    /*
    if (info.id === null) {
      marker.setOptions({ ...options, icon: setIcon(3) });
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
    } else {
      marker.setOptions({ ...options, icon: setIcon(info.tp_id) });
    }*/
  }

  return null;

};

export default ElemMarker;