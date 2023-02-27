import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { red } from '@mui/material/colors';
import { findPointsInASystem } from '../../services';

function ElemOpenDemand({ map, open, row, user, setUser, data, setData }) {

  function onClick(dt) {

    // id do marcador
    let id = Date.now();
    // setar coordenada do marcador

    setData(prev => {
      return {
        ...prev,
        overlays: {
          ...prev.overlays,
          marker: {
            ...prev.overlays.marker,
            id: id,
            position: {
              lat: dt.int_latitude.toFixed(6),
              lng: dt.int_longitude.toFixed(6)

            },
            info: {
              ...prev.overlays.marker.info,
              tp_id: dt.sub_tp_id
            }
          }
        },
        //  system: { outorgas: points._outorgas, shp: points._shp }
      }
    });

    _findPointsInASystem(dt.sub_tp_id, dt.int_latitude, dt.int_longitude).then(() => {

      // somatório da vazão anual do usuário
      let _q_user = 0;
      console.log(dt.dt_demandas.demanda)
      dt.dt_demandas.demanda.forEach(dem => {
        _q_user += Number(dem.vol_mensal_mm)
      })
      console.log(_q_user)

      // setar usuário
      setUser(prev => {
        return {
          ...prev,
          dt_demandas: dt.dt_demandas,
          q_user: _q_user

        }
      });
    })

  }

  async function _findPointsInASystem(tp_id, lat, lng) {
    let points = await findPointsInASystem(tp_id, lat, lng);

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
    // centralizar o mapa na nova coordenada
    map.setCenter({ lat: parseFloat(lat), lng: parseFloat(lng) })
  }

  return (
    <TableRow >
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <Typography variant="p" gutterBottom component="div">
              Finalidades Autorizadas
            </Typography>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell>Latitude</TableCell>
                  <TableCell>Longitude</TableCell>
                  <TableCell>Vazão Jan (L/H)</TableCell>
                  <TableCell>Vazão Jan (L/Dia)</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {
                  row.demandas.map((dt, i) =>
                    <TableRow key={"____" + i} sx={{ bgcolor: '#e4e4e4' }}>
                      <TableCell>{dt.int_latitude}</TableCell>
                      <TableCell>{dt.int_longitude}</TableCell>
                      <TableCell>{dt.int_longitude}</TableCell>
                      <TableCell>{dt.int_longitude}</TableCell>
                      <TableCell><IconButton color="secondary" size="large" onClick={() => { onClick(dt) }}>
                        <DoneAllIcon />
                      </IconButton></TableCell>
                    </TableRow>
                  )
                }
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  )
}
export { ElemOpenDemand }