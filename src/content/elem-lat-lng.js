import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import { findPointsInASystem } from '../services';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { CircularProgress, Fade, Paper, TableContainer } from '@mui/material';
import { analyseItsAvaiable } from '../tools';


function ElemLatLng({ map, tp_id, position, setData }) {

  const [loading, setLoading] = useState(false);

  const [_position, _setPosition] = useState(position);
  const [_tp_id, _setTpId] = useState(tp_id);
  /**
   * Setar posição e tipo de poço - talves possa fazer os dois juntos em um só hooks.
   */
  useEffect(() => {
    _setPosition(position);
    _setTpId(tp_id);

  }, [position, tp_id]);
  /**
   * Mudar as coordenadas de cada caixa de texto.
   * @param {*} event 
   */
  const handleChange = (event) => {

    setData(prev => {
      return {
        ...prev,
        overlays: {
          ...prev.overlays,
          marker: {
            ...prev.overlays.marker,
            position: {
              ...prev.overlays.marker.position,
              [event.target.name]: event.target.value
            }
          }
        }
      }
    });
  };
  /**
   * Buscar pontos outorgados no sistema (Fraturado ou Poroso) e retornar dados como vazão outorgada, nº de poços etc.
   * @returns _q_ex - Vazão Explotável, _n_points - Número de pontos outorgados na área, etc...
   */
  async function _findPointsInASystem() {

    setLoading((prevLoading) => !prevLoading);

    let points = await findPointsInASystem(_tp_id, _position.lat, _position.lng);


    let _hg_analyse = analyseItsAvaiable(points._hg_info, points._points)

    setData(prev => {
      return {
        ...prev,
        system: {
          points: points._points,
          hg_shape: points._hg_shape,
          hg_info: points._hg_info,
          hg_analyse: _hg_analyse
        }
      }

    });
    map.setCenter({ lat: parseFloat(_position.lat), lng: parseFloat(_position.lng) })
  }

  return (

    <FormControl sx={{ display: 'flex' }}>
      <FormLabel id="demo-controlled-radio-buttons-group" >Coordenadas</FormLabel>
      <Paper elevation={3} style={{ margin: 1 }}>
        {/* entradas latitude e longitude */}
        <Box sx={{ display: 'flex', flexFlow: 'row wrap' }}
        >
          <Box sx={{ display: 'flex', flex: 4, flexDirection: 'row' }}>
            <TextField
              sx={{
                my: 1,
                ml: 1,
                display: 'flex',
                flexGrow: 1
              }}
              label="Latitude"
              color="secondary"
              name="lat"
              value={_position.lat}
              onChange={handleChange}
              size="small"
            />
            <TextField
              sx={{
                my: 1,
                ml: 1,
                display: 'flex',
                flexGrow: 1,

              }}
              color="secondary"
              label="Longitude"
              name="lng"
              value={_position.lng}
              onChange={handleChange}
              size="small"
            />
          </Box>
          {/* botôes de manipulação */}
          <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {
              loading ?
                <Fade
                  sx={{ color: "secondary.main" }}
                  in={loading}
                  style={{
                    transitionDelay: loading ? '800ms' : '0ms',
                  }}
                  unmountOnExit
                >
                  <CircularProgress size={25} />
                </Fade>
                :
                <IconButton color="secondary" size="large" onClick={() => { _findPointsInASystem().then(() => { setLoading(false); }); }}>
                  <SearchIcon />
                </IconButton>

            }


            <IconButton color="secondary" size="large">
              <ContentCopyIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </FormControl>

  )
}

export default ElemLatLng;