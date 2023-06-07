import React, { useContext, useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { Wrapper } from "@googlemaps/react-wrapper";
import ElemMap from './components/elem-map/elem-map';
import ElemDrawManager from './components/elem-draw-manager';
import ElemMarker from './components/elem-marker';
import ElemPolygon from './components/elem-polygon';
import ElemPolyline from './components/elem-polyline';
import { fetchShape } from '../../services';
import { SystemContext } from '../elem-content';
import { initialState } from '../initial-state';

/**
 * Componente para exibir um mapa com conteúdo.
 *
 * @param {Object} props - As propriedades do componente.
 * @param {string} props.mode - O modo do mapa.
 * @param {Object} props.center - O centro do mapa.
 * @param {number} props.zoom - O nível de zoom do mapa.
 * @param {Function} props.onClick - Função de clique no mapa.
 * @param {Object} props.map - O objeto do mapa.
 * @param {Function} props.setMap - Função para atualizar o objeto do mapa.
 * @param {Object} props.data - Os dados do mapa.
 * @param {Function} props.setData - Função para atualizar os dados do mapa.
 * @param {Array} props.selectedRows - As linhas selecionadas.
 * @returns {JSX.Element} O componente ElemMapContent.
 */

function ElemMapContent({ tab, mode }) {

  /**
   * Map
   */
  const [map, setMap] = useState();
  /**
   * Map controls
   */
  const [controls, setControls] = useState({
    center: { lat: -15.760780, lng: -47.815997 },

  })
  const [system, setSystem, overlays, setOverlays, shapes, setShapes] = useContext(SystemContext);
 
  const [system_markers, setSystemMarkers] = useState([]);

  useEffect(() => {
    setSystemMarkers(system.markers)

  }, [system.markers]);

  useEffect(() => {
    setSystemMarkers(system.sel_markers)
  }, [system.sel_markers]);

  function setPolygons(shape, polygons) {
    setShapes(prev => {
      return {
        ...prev,
        [shape]: { ...prev[shape], polygons: polygons }
      }
    })

  }
  
  function renderPolylines(shape) {

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

  async function getShape(shape) {
    let _shape = await fetchShape(`hidrogeo_${shape}`);
    return _shape;
  }
  
  const [_shapes, _setShapes] = useState({
    fraturado: { polygons: [] },
    poroso: { polygons: [] }
  })

  useEffect(() => {

    ['poroso', 'fraturado'].forEach(shape => {
      let { checked, polygons } = shapes[shape];

      if (checked && polygons.length === 0 && _shapes[shape].polygons.length === 0) {

        getShape(shape).then(_polygons => {
          console.log('servidor')

          setShapes(prev => {
            return {
              ...prev,
              [shape]: { ...prev[shape], ...prev[shape].polygons = _polygons }
            }
          })

          _setShapes(prev => {
            return {
              ...prev,
              [shape]: { polygons: _polygons }
            }
          })

        });

      } else if (checked && polygons.length === 0 && _shapes[shape].polygons.length > 0) {
        setShapes(prev => {
          return {
            ...prev,
            [shape]: { ...prev[shape], ...prev[shape].polygons = _shapes[shape].polygons }
          }
        })
      }
    });

  }, [shapes])

  return (
    <Box style={{ display: "flex", flex: 6, flexDirection: 'column' }} >
      <Wrapper apiKey={"AIzaSyDELUXEV5kZ2MNn47NVRgCcDX-96Vtyj0w"} libraries={["drawing"]}>
        <ElemMap mode={mode} map={map} setMap={setMap} zoom={10} center={{ lat: -15.764514558482336, lng: -47.76491209127806 }} />
        {/* Desenhar círculos, polígonos etc */}
        {<ElemDrawManager map={map} />}
        {/*marcadores*/}
        {
          overlays.markers.map(markers => {
            return markers.points.map((m, ii) => {

              return (
                <ElemMarker
                  key={ii}
                  marker={m}
                  map={map}
                  icon={m.tp_id}
                />)
            })
          })
        }
        {
          system_markers.map((marker, i) => {
            return (
              <ElemMarker
                key={i}
                marker={marker}
                map={map}
                icon={i === 0 ? 0 : marker.tp_id}
              />)
          })
        }
        {renderPolylines(system.hg_shape)}

        {
          shapes.fraturado.polygons.map((shape, i) => {
            console.log('render polygon fraturado')
            return (
              <ElemPolygon key={i} shape={shape} map={map} />
            )
          })
        }
        {shapes.poroso.polygons.map((shape, i) => {
          console.log('render polygon poroso')
          return (
            <ElemPolygon key={i} shape={shape} map={map} />
          )
        })
        }
      </Wrapper>
    </Box>
  )
}

export default ElemMapContent;