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
  container: {
    display: 'flex',
    flexDirection: 'column',

  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    }
  },
  map: {
    flexBasis: '50%',
    display: 'flex',
    alignItems: 'stretch',

    margin: 10,
    backgroundColor: 'green'
  },
  info: {
    flexBasis: '50%',

    margin: 10,
    overflowX: 'hidden',
    overflowY: 'hidden',
    backgroundColor: 'yellow'

  },
  bottom: {
    minHeight: 300,
    margin: 10,
    backgroundColor: 'orange'
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
  const [overlays, setOverlays] = useState(initialState.overlays);
  const [shapes, setShapes] = useState(initialState.shapes)


  function onClick() {
    // console.log('on click')
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();

  return (
    <Box className={classes.container}>
      {/** box 1 */}
      <Box className={classes.content}>
        {/** MAPA */}
        <Box className={classes.map}>
          <Box sx={{ typography: 'body1' }} >
            <TabContext value={'0'}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList textColor='secondary' indicatorColor='secondary'>
                  <Tab label='Mapa' value='0' />
                </TabList>
              </Box>
              <TabPanel value='0'>
              <SystemContext.Provider value={[system, setSystem, overlays, setOverlays, shapes, setShapes]}>
                <Box>
                  <ElemMapContent tab={value} mode={mode}
                    selectedRows={selectedRows} />
                  <ElemMapControllers data={data} setData={setData} />
                </Box>
                </SystemContext.Provider>
              </TabPanel>
            </TabContext>
          </Box>
        </Box>

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
              <TabPanel value='1'>
                <Box >
                  <SystemContext.Provider value={[system, setSystem, map]}>

                    <ElemLatLng />
                    <ElemWellType/>
                    <ElemAnalyse />
                    <ElemBarChart/>

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
      <Box className={classes.bottom}>
        <SystemContext.Provider value={[system, setSystem]}>
          <Box> Outorgas</Box>
        </SystemContext.Provider>

      </Box>
    </Box>
  );
}

export default ElemContent;
