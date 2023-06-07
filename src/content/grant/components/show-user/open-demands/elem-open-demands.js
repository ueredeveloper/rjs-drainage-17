import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { ElemDemand } from './demand/elem-demand';
import { findDemands } from '../../../../../services/shapes';

function ElemOpenDemands({ open, user, setUser }) {

  const [demands, setDemands] = useState([{ dt_demanda: { demandas: [] } }]);

  function updateDemands(end_id) {
    findDemands(end_id).then(demands => {
      setDemands(demands)
    });
  }

  useEffect(() => {

    if (open) {
      updateDemands(user.end_id)
    }
  }, [open]);

  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <Typography variant="p" gutterBottom component="div">Finalidades Autorizadas</Typography>
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
                    <ElemDemand key={"elem_demand_" + i} demand={demand} user={user} setUser={setUser} />)
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