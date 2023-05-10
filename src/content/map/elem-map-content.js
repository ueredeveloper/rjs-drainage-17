import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { Wrapper } from "@googlemaps/react-wrapper";
import ElemMap from './elem-map';
import ElemDrawManager from './elem-draw-manager';
import ElemMarker from './elem-marker';
import ElemPolygon from './elem-polygon';
import ElemPolyline from './elem-polyline';
import { getShape } from '../../services';
import { makeStyles } from '@mui/styles';



/**
* Element Home Map
*
*/
function ElemMapContent({ mode, center, zoom, onClick, map, setMap, data, setData }) {
  const [points, setPoints] = useState()

  /**
  * Salvar os polígonso solicitados no servidor em uma variável para uso frequente.
  */
  const [_shapes, _setShapes] = useState({
    fraturado: { polygons: [] },
    poroso: { polygons: [] }
  })

  /**
  * Setar os polígonos da shape do fraturado ou fraturado
  *
  */
  function setPolygons(shape, polygons) {
    setData(prev => {
      return {
        ...prev,
        shapes: {
          ...prev.shapes, ...prev.shapes[shape].shapes = polygons
        }
      }
    });

  }
  /** 
  *  Mostrar o subsistema que foi pesquisado em formato de polilinhas.
  *  @param {array} Shape do subsistema.
  */
  function renderPolyline(shape) {

    if (shape.type === 'MultiPolygon') {
      return shape.coordinates.map((coord, i) => {
        return coord.map((_coord, ii) => {
          return (<ElemPolyline key={ii} coord={_coord} map={map} />)
        })
      })
    }
    else {
      return shape.coordinates.map((coord, i) => {
        return (<ElemPolyline key={i} coord={coord} map={map} />)
      })
    }

  }
  /**
      * Buscar no servidor se estiver as duas variáveis vazias {data.shapes e _shape}, caso contrário 
      buscar os dados na variável _shapes que já foi preenchida com os polígonos fraturado ou poroso.
      */
  useEffect(() => {

    ['poroso', 'fraturado'].forEach(system => {
      let { checked, shapes } = data.shapes[system];
      
      if (checked && shapes.length === 0 && _shapes[system].polygons.length === 0) {

        _getShape(system).then(_polygons => {

          setPolygons(system, _polygons)
          _setShapes(prev => {
            return {
              ...prev,
              [system]: { polygons: _polygons }
            }
          })
        });
      } else if (checked && shapes.length === 0 && _shapes[system].polygons.length > 0) {
        setPolygons(system, _shapes[system].polygons);
      }

    })

  }, [data, setPolygons, _shapes])

  async function _getShape(shape) {
    let _shape = await getShape(`hidrogeo_${shape}`);
    return _shape;
  }

  function setMarker() {

    let { lat, lng } = data.overlays.marker.position;
    let { info } = data.overlays.marker;
    return (
      <ElemMarker
        info={info}
        options={{ position: { lat: parseFloat(lat), lng: parseFloat(lng) }, map: map }} />
    )

  }
  

  const [mapHeight, setMapHeight] = useState(window.innerHeight * 0.6);

  const handleResize = () => {
    setMapHeight(window.innerHeight * 0.6);
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const style = {
    width: '100%',
    height: `${mapHeight}px`
  };


  //style={{height: '20rem'}}
  return (
    <Box style={style} >
      <Wrapper apiKey={"AIzaSyDELUXEV5kZ2MNn47NVRgCcDX-96Vtyj0w"} libraries={["drawing"]}>
        <ElemMap mode={mode} center={center} zoom={zoom} onClick={onClick} map={map} setMap={setMap} />
        {/* Desenhar círculos, polígonos etc */}
        <ElemDrawManager map={map} data={data} setData={setData} />
        {/*marcadores*/}
        {
          data.overlays.markers.map(markers => {
            return markers.points.map((info, ii) => {
              // coordenadas da outorga em formato geometry

              let [x, y] = info.int_shape.coordinates;
              return (
                <ElemMarker
                  key={ii}
                  info={info}
                  // coordenada em formato gmaps
                  options={{ position: { lat: y, lng: x }, map: map }} />)
            })
          })
        }
        {
          data.system.points.map((point, i) => {

            // capturar coordenadas
            let [x, y] = point.int_shape.coordinates;

            return (
              <ElemMarker
                key={i}
                info={{ id: Date.now(), tp_id: point.tp_id }}
                // coordenada em formato gmaps
                options={{ position: { lat: y, lng: x }, map: map }} />)
          })
        }
        {

          renderPolyline(data.system.hg_shape)}

        {
          data.shapes.fraturado.shapes.map((shape, i) => {
            return (
              <ElemPolygon key={i} shape={shape} map={map} />
            )
          })
        }
        {
          data.shapes.poroso.shapes.map((shape, i) => {
            return (
              <ElemPolygon key={i} shape={shape} map={map} />
            )
          })
        }

        {setMarker()}
      </Wrapper>
    </Box>
  )
}

export default ElemMapContent;