import React, { useEffect, useState, useRef } from 'react';
import { darkMap } from './mode/dark-map';
/**
  * Elemento mapa
  */

function ElemMap({ mode, map, setMap, zoom, center }) {

  const ref = useRef();

  function onClick() {
    console.log('on click')
  }

  useEffect(() => {

    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center,
          zoom
        })
      );
    }

    if (map) {
      ["click"].forEach((e) =>
        window.google.maps.event.clearListeners(map, e)
      );
      // mode light dark
      mode === "dark" ? map.setOptions({ styles: darkMap }) : map.setOptions({ styles: [] });
      // click no mapa
      map.addListener("click", onClick);
      // centralizar
      map.setCenter({ lat: parseFloat(center.lat), lng: parseFloat(center.lng) })
    }
  }, [ref, map, mode, onClick]);

  return (
    <div style={{ width: '100%', height: '100%' }} ref={ref} id="map" />
  );

}

export default ElemMap;

