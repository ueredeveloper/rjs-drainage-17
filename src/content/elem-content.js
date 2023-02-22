import React, { useState, useEffect } from 'react';
import ElemMapContent from './map/elem-map-content';
import ElemWellType from './elem-well-type';
import ElemAnalyse from './elem-analyse';
import ElemMapControllers from './map/elem-map-controllers';
import ElemBarChart from './elem-bar-chart';
import ElemLatLng from './elem-lat-lng';
import GrantTable from './grant-table';
import { initialState } from './initial-state';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';;


function ElemContent() {

    const [map, setMap] = useState();
    const [mode, setMode] = useState('light');
    const [data, setData] = useState(initialState());
    const [value, setValue] = useState("1");
    const center = { lat: -15.762744, lng: -47.813301 };
    const zoom = 10;

    function onClick() {
        console.log('on click')
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box >
            <Box
                sx={{
                    display: 'flex',
                    flexFlow: 'row wrap'
                }}>
                {/** MAPA */}
                <Box sx={{ flex: 1 }}>
                    <TabContext value={"0"}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList>
                                <Tab label="Mapa" value="0" />
                            </TabList>
                        </Box>
                        <TabPanel value="0">
                            <ElemMapContent tab={value} mode={mode} center={center} zoom={zoom} onClick={onClick} map={map} setMap={setMap} data={data} setData={setData} />
                            <ElemMapControllers data={data} setData={setData} />
                        </TabPanel>
                    </TabContext>
                </Box>
                {/** TABS */}
                <Box sx={{ flex: 1 }}>

                <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Geral" value="1" />
                    <Tab label="Superficial" value="2" />
                    <Tab label="Subterrâneo" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <ElemLatLng
                    map={map}
                    tp_id={data.overlays.marker.info.tp_id}
                    position={data.overlays.marker.position}
                    setData={setData}
                  />
                  <ElemWellType
                    tp_id={data.overlays.marker.info.tp_id}
                    setData={setData} />
                  <ElemAnalyse hg_analyse={data.system.hg_analyse} />
                  {/*<ElemBarChart hg_analyse={data.system.hg_analyse} />*/}
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
              </TabContext>
            </Box>
                </Box>

            </Box>
            {/** TABELA */}

            <Box> 
            <GrantTable points={data.system.points} />
             </Box>

        </Box>
    );
}

export default ElemContent;