import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { ElemDemand } from './elem-demand';
import { getDemands } from '../../services/shapes';


function ElemOpenDemands({ open, user, setUser, map, setData }) {

  const [demands, setDemands] = useState([{ dt_demanda: { demandas: [] } }]);

  async function _setDemands(end_id) {

    let _demands = await getDemands(end_id);

    setDemands(_demands)

    /*
    let _users = users.map(user => {
        // adicionar demandas ao endereço específico
        if (user.end_id === end_id) {
            return { ...user, dt_demanda: _dt_demanda }
        }
        return user;
    })
    setUsers(_users)
    */
  }

  useEffect(() => {
    if (open) {
      _setDemands(user.end_id)
    }
  }, [open]);





  async function _findPointsInASystem(tp_id, lat, lng) {

    /* await findPointsInASystem(tp_id, lat, lng).then(points => {
 
 
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
     );*/

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
                  <TableCell>Duplicar</TableCell>
                  <TableCell>Inserir</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {
                  demands.map((demand, i) => (
                    <ElemDemand key={"elem_demand_" + i} demand={demand} map={map} user={user} setUser={setUser} setData={setData} />)
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
export { ElemOpenDemands }