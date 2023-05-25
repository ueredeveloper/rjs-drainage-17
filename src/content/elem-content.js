import React, { useState, useEffect, createContext } from 'react';
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
export const SystemContext = createContext({})


function ElemContent({ mode, theme }) {

    // retirar
  const [map, setMap] = useState();

  const [data, setData] = useState(initialState);

  /** Manipulador para a tabela de outorgas, adicionando ou retirando usuário do cálculo de disponibilidade.
  * 
  */
  const [selectedRows, setSelectedRows] = useState([]);

  const [value, setValue] = useState('1');

  //const center = { lat: -15.760780, lng: -47.815997 };
  //const zoom = 10;

  /**
   * Usuário de recursos hídricos
   */
  //const [marker, setMarker] = useState(initialState.system.markers[0]);
  const [system, setSystem] = useState(initialState.system);
  const [overlays, setOverlays] = useState(initialState.overlays)
  //const [selectedMarkers, setSelectedMarkers] = useState([])



  

  function onClick() {
    // console.log('on click')
  }

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
              <SystemContext.Provider value={[system, setSystem, overlays, setOverlays]}>
                <Box sx={{ height: '75vh', display: 'flex', flexDirection: 'column' }}>
                  <ElemMapContent tab={value} mode={mode}
                    selectedRows={selectedRows} />
                  <ElemMapControllers data={data} setData={setData} />
                </Box>
                </SystemContext.Provider>
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
                  <SystemContext.Provider value={[system, setSystem, map]}>
                    {/** Latitude e Longitude */}
                    <ElemLatLng />
                    {/** Tipo de Poço */}
                    <ElemWellType />
                    {/** Análise */}
                    <ElemAnalyse />
                    {/** Barras */}
                    <ElemBarChart />
                  </SystemContext.Provider>
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
        <SystemContext.Provider value={[system, setSystem]}>
          <ElemListGrants/>
        </SystemContext.Provider>

      </Box>
    </Box>
  );
}

export default ElemContent;
