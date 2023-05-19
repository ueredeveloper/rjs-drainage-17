import React, { useState, useEffect } from 'react';
import ElemMapContent from './map/elem-map-content';
import ElemWellType from './elem-well-type';
import ElemAnalyse from './elem-analyse';
import ElemMapControllers from './map/elem-map-controllers';
import ElemBarChart from './elem-bar-chart';
import ElemLatLng from './elem-lat-lng';
import ElemListGrants from './elem-list-grants';
import { initialState } from './initial-state';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { makeStyles } from '@mui/styles';
import { findPointsInASystem } from '../services';
import { analyseItsAvaiable } from '../tools';
import { orange } from '@mui/material/colors';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',

  },
  box1: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    }
  },
  map: {
    flexBasis: '40%',
    marginBottom: 5
  },
  info: {
    flexBasis: '60%',
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden',
    overflowY: 'hidden',
    marginBottom: 15
  },
  box2: {

  },

}));


function ElemContent({ mode, theme }) {

  const [map, setMap] = useState();

  const [data, setData] = useState(initialState);

  /** Manipulador para a tabela de outorgas, adicionando ou retirando usuário do cálculo de disponibilidade.
  * 
  */
  const [selectedRows, setSelectedRows] = useState([]);

  const [value, setValue] = useState('1');

  const center = { lat: -15.760780, lng: -47.815997 };
  const zoom = 10;

  /**
   * Usuário de recursos hídricos
   */
  const [marker, setmarker] = useState(initialState.system.markers[0]);

  useEffect(() => {

    // id do marcador
    //let id = Date.now();
    if (marker.tp_id !== 0)
      findPointsInASystem(marker.tp_id, marker.int_latitude, marker.int_longitude)
        .then(points => {

          let _points = points._points;
          
          // adicionar usuário na array de pontos outorgados no polígono.
          let __points = [marker, ..._points]
          // verificar disponibilidade com o ponto (marker) adicionado.
          let _hg_analyse = analyseItsAvaiable(points._hg_info, __points);

          setData(prev => {
            return {
              ...prev,
              /*
              overlays: {
                ...prev.overlays,
                marker: {
                  ...prev.overlays.marker,
                  id: id,
                  position: {
                    lat: marker.int_latitude.toFixed(6),
                    lng: marker.int_longitude.toFixed(6)

                  },
                  info: {
                    ...prev.overlays.marker.info,
                    tp_id: marker.sub_tp_id
                  }
                }
              },*/
              system: {
                // adicionar todos os pontos, contendo também o usuário
                points: __points,
                hg_shape: points._hg_shape,
                hg_info: points._hg_info,
                hg_analyse: _hg_analyse
              }
            }
          });
        })
        .then(
          // centralizar o mapa na nova coordenada
          () => { map.setCenter({ lat: parseFloat(marker.int_latitude), lng: parseFloat(marker.int_longitude) }) }
        )
    //.then(() => { setLoading(false); });

    //console.log(marker)
  }, [marker])

  function onClick() {
    // console.log('on click')
  }

  useEffect(()=>{
   // console.log('data', data)
  }, [data])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();

  return (
    <Box className={classes.content}>
      {/** box 1 */}
      <Box className={classes.box1}>
        {/** MAPA */}
        <Box className={classes.map}>
          <Box sx={{ typography: 'body1' }} >
            <TabContext value={'0'}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList textColor='secondary' indicatorColor='secondary'>
                  <Tab label='Mapa' value='0' />
                </TabList>
              </Box>
              <TabPanel value='0' style={{ margin: -10 }}>
                <Box sx={{ height: '75vh', display: 'flex', flexDirection: 'column' }}>
                  <ElemMapContent tab={value} mode={mode} center={center} zoom={zoom} onClick={onClick} map={map} setMap={setMap} data={data} setData={setData}
                    selectedRows={selectedRows} />
                  <ElemMapControllers data={data} setData={setData} />
                </Box>
              </TabPanel>
            </TabContext>
          </Box>
        </Box>

        {/** INFO */}
        <Box className={classes.info}>
          <Box sx={{ typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList textColor='secondary' indicatorColor='secondary' onChange={handleChange} aria-label=''>
                  <Tab label='Geral' value='1' />
                  <Tab label='Superficial' value='2' />
                  <Tab label='Subterrâneo' value='3' />
                </TabList>
              </Box>
              <TabPanel value='1' style={{ margin: -10 }}>
                <Box sx={{ height: '75vh', display: 'flex', flexDirection: 'column', overflowX: 'auto' }}>
                  {/** Latitude e Longitude */}
                  <ElemLatLng
                    map={map}
                    marker={marker}
                    setData={setData}
                  />
                  {/** Tipo de Poço */}
                  <ElemWellType
                    marker={marker}
                    setData={setData} />
                  {/** Análise */}
                  <ElemAnalyse map={map} marker={marker} setmarker={setmarker} data={data} setData={setData} selectedRows={selectedRows} />
                  {/** Barras */}
                  <ElemBarChart theme={theme} marker={marker} hg_analyse={data.system.hg_analyse} />
                </Box>
              </TabPanel>
              <TabPanel value='2'>Item Two</TabPanel>
              <TabPanel value='3'>Item Three</TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Box>

      {/** box 2 */}
      <Box className={classes.box2}>
        <ElemListGrants markers={data.system.markers} setSelectedRows={setSelectedRows} />
      </Box>
    </Box>
  );
}

export default ElemContent;

/* 

<Box className={classes.box2} sx={{ display: 'flex', flex: 1, justifyContent: 'center' }}>


<Box sx={{ display: 'flex', flex: 1, width: '100%', justifyContent: 'center' }}>
*/