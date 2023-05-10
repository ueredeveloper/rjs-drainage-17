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
    display: "flex",
    flexDirection: "row",

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    }
    ,backgroundColor: 'orange'
  },
  map: {
    flexBasis: "50%",
    

  },
  infos: {
    flexBasis: "50%",
    display: "flex",
    flexDirection: "column",
    overflowX: "auto",
   
  },

}));


function ElemContent({ mode, theme }) {

  const [map, setMap] = useState();

  const [data, setData] = useState(initialState());
  /**
   * Usuário solicitado.
   */
  const [user, setUser] = useState(
    {
      "id": 0,
      "us_id": 0,
      "sub_tp_id": 0,
      "us_nome": "",
      "us_cpf_cnpj": "",
      "us_doc_id": 0,
      "doc_end": 0,
      "doc_sei": "",
      "proc_sei": "",
      "end_id": 0,
      "end_logradouro": "",
      "int_latitude": "",
      "int_longitude": "",
      "dt_demanda": {
        "demandas": [],
        "vol_anual_ma": "0"
      },
      "int_shape": { "coordinates": [] }

    });

  useEffect(() => {

    // id do marcador
    let id = Date.now();
    if (user.sub_tp_id !== 0)
      findPointsInASystem(user.sub_tp_id, user.int_latitude, user.int_longitude)
        .then(points => {

          let _points = points._points;
          // adicionar usuário na array de pontos outorgados no polígono.
          let __points = [..._points, user]
          // verificar disponibilidade com o ponto (user) adicionado.
          let _hg_analyse = analyseItsAvaiable(points._hg_info, __points);

          setData(prev => {
            return {
              ...prev,
              overlays: {
                ...prev.overlays,
                marker: {
                  ...prev.overlays.marker,
                  id: id,
                  position: {
                    lat: user.int_latitude.toFixed(6),
                    lng: user.int_longitude.toFixed(6)

                  },
                  info: {
                    ...prev.overlays.marker.info,
                    tp_id: user.sub_tp_id
                  }
                }
              },
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
          () => { map.setCenter({ lat: parseFloat(user.int_latitude), lng: parseFloat(user.int_longitude) }) }
        )
    //.then(() => { setLoading(false); });
  }, [user])
  /** Manipulador para a tabela de outorgas, adicionando ou retirando usuário do cálculo de disponibilidade.
   * 
   */
  const [grantedRows, setGrantedRows] = useState([]);

  const [value, setValue] = useState("1");

  const center = { lat: -15.760780, lng: -47.815997 };
  const zoom = 10;

  function onClick() {
    // console.log('on click')
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();

  return (
    <Box>
      <Box className={classes.content}>
        <Box className={classes.map}>
          {/** MAPA */}
          <Box>
            <TabContext value={"0"}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList textColor="secondary" indicatorColor="secondary">
                  <Tab label="Mapa" value="0" />
                </TabList>
              </Box>
              <TabPanel value="0" style={{ backgroundColor: 'red' }}>
                <ElemMapContent tab={value} mode={mode} center={center} zoom={zoom} onClick={onClick} map={map} setMap={setMap} data={data} setData={setData} />
                <ElemMapControllers data={data} setData={setData} />
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
        {/** INFOS */}
        <Box className={classes.infos}>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList textColor="secondary" indicatorColor="secondary" onChange={handleChange} aria-label="">
                    <Tab label="Geral" value="1" />
                    <Tab label="Superficial" value="2" />
                    <Tab label="Subterrâneo" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1" style={{ backgroundColor: 'green' }}>
                  {/** Latitude e Longitude */}
                  <ElemLatLng
                    map={map}
                    tp_id={data.overlays.marker.info.tp_id}
                    position={data.overlays.marker.position}
                    setData={setData}
                  />
                  {/** Tipo de Poço */}
                  <ElemWellType
                    tp_id={data.overlays.marker.info.tp_id}
                    setData={setData} />
                  <ElemAnalyse map={map} user={user} setUser={setUser} data={data} setData={setData} grantedRows={grantedRows} />
                  {/** Barras */}
                  <ElemBarChart theme={theme} user={user} hg_analyse={data.system.hg_analyse} />
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
              </TabContext>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        {/** OUTORGAS */}
        <Box>
          <ElemListGrants points={data.system.points} setGrantedRows={setGrantedRows} />
        </Box>
      </Box>
    </Box>
  );
}

export default ElemContent;