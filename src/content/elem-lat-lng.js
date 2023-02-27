import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import { findPointsInASystem } from '../services';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


function ElemLatLng({ map, tp_id, position, setData }) {

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
    let points = await findPointsInASystem(_tp_id, _position.lat, _position.lng);

    function analyseItsAvaiable(_q_ex, _points) {
      let _Q = 0;
      _points.map((_point) => {
        if (typeof _point.demandas.volume.vol_a_ma === 'undefined') {
          return _Q += 0;
        } else {
          return _Q += parseFloat(_point.demandas.volume.vol_a_ma);
        }
      });
      let _q_ex_per = ((_q_ex * 100) / _q_ex).toFixed(0);
      let _n_points = _points.length;
      let _q_points = _Q;
      let _q_points_per = ((_Q * 100) / _q_ex).toFixed(4);

      return {
        // Q explotável
        _q_ex: _q_ex,
        // nº pontos
        _n_points: _n_points,
        // Q outorgada
        _q_points: _q_points,
        // 100%
        _q_ex_per: _q_ex_per,
        // % utilizada
        _q_points_per: _q_points_per,
        // vol disponível
        _vol_avaiable: (_q_ex - _q_points).toFixed(4)
      };
    }

    let _hg_analyse = analyseItsAvaiable(points._hg_info.re_cm_ano, points._points)

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
      <FormLabel id="demo-controlled-radio-buttons-group">Coordenadas</FormLabel>
      {/* entradas latitude e longitude */}
      <Box sx={{ display: 'flex', flexFlow: 'row wrap' }}
      >
        <Box sx={{ display: 'flex', flex: 4, flexDirection: 'row' }}>
          <TextField
            sx={{
              m: 1,
              display: 'flex',
              flexGrow: 1
            }}
            label="Latitude"
            name="lat"
            value={_position.lat}
            onChange={handleChange}
            size="small"
          />
          <TextField
            sx={{
              m: 1,
              display: 'flex',
              flexGrow: 1,

            }}
            label="Longitude"
            name="lng"
            value={_position.lng}
            onChange={handleChange}
            size="small"
          />
        </Box>
        {/* botôes de manipulação */}
        <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <IconButton color="secondary" size="large" onClick={() => { _findPointsInASystem() }}>
            <SearchIcon />
          </IconButton>
          <IconButton color="secondary"size="large">
            <ContentCopyIcon />
          </IconButton>
        </Box>
      </Box>

    </FormControl>

  )
}

export default ElemLatLng;