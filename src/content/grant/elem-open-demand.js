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
import { CircularProgress, Fade } from '@mui/material';
import { analyseItsAvaiable } from '../../tools';

function ElemOpenDemand({ map, open, row, user, setUser, data, setData }) {
  // mostrar barra de progresso ao clicar
  const [loading, setLoading] = useState(false);

  function onClick(dt) {

    setLoading((prevLoading) => !prevLoading);

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

    _findPointsInASystem(dt.sub_tp_id, dt.int_latitude, dt.int_longitude)
      .then(() => {

        // setar usuário
        setUser(prev => {
          return {
            ...prev,
            dt_demandas: dt.dt_demandas
          }
        });

      }).then(() => { setLoading(false); })

  }

  async function _findPointsInASystem(tp_id, lat, lng) {

    await findPointsInASystem(tp_id, lat, lng).then(points => {

      let _hg_analyse = analyseItsAvaiable(points._hg_info, points._points);

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
      })

    }).then(
      // centralizar o mapa na nova coordenada
      () => { map.setCenter({ lat: parseFloat(lat), lng: parseFloat(lng) }) }
    );

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
                <TableRow sx={{ p: 3 }}>
                  <TableCell>Latitude</TableCell>
                  <TableCell>Longitude</TableCell>
                  <TableCell>Vazão Jan (L/H)</TableCell>
                  <TableCell>Vazão Jan (L/Dia)</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {
                  row.demandas.map((dt, i) =>
                    <TableRow key={"____" + i} sx={{ bgcolor: '#ECECEC' }}>
                      <TableCell>{dt.int_latitude}</TableCell>
                      <TableCell>{dt.int_longitude}</TableCell>
                      {/** mostra vazões em janeiro */}
                      {
                        dt.dt_demandas.demanda.length !== 0
                          ?
                          <TableCell>{dt.dt_demandas.demanda[0].vazao_lh}</TableCell>
                          :
                          <TableCell>{''}</TableCell>
                      }
                      {
                        dt.dt_demandas.demanda.length !== 0
                          ?
                          <TableCell>{dt.dt_demandas.demanda[0].vazao_dia}</TableCell>
                          :
                          <TableCell>{''}</TableCell>
                      }

                      <TableCell>
                        <Box sx={{ display: 'flex' }}>
                          {loading ? <Fade
                            sx={{ alignSelf: 'center', color: "secondary.main", margin: 1.5 }}
                            in={loading}
                            style={{
                              transitionDelay: loading ? '800ms' : '0ms',
                            }}
                            unmountOnExit
                          >
                            <CircularProgress size={25} />
                          </Fade>
                            :
                            <IconButton
                              color="secondary"
                              size="large"

                              onClick={() => { onClick(dt) }}>
                              <DoneAllIcon />
                            </IconButton>}
                        </Box></TableCell>
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