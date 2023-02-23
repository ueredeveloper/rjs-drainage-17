import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ElemGrant from './grant';

function ElemAnalyse({ hg_analyse }) {
  /**
    * Dados sobre a disponibilidade.
    */
  const [_hg_analyse, _setHGAnalyse] = useState(hg_analyse);

  useEffect(() => {
    _setHGAnalyse(hg_analyse)
  }, [hg_analyse])

  return (
    <Box>
      <FormControl>
        <Box sx={{display: 'flex', flexDirection: 'flex-row', justifyContent: 'space-between'}}>
          <FormLabel id="demo-controlled-radio-buttons-group">Análise</FormLabel>
          <ElemGrant/>
        </Box>
        <TableContainer sx={{ maxHeight: 330 }} component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell>Q Explotável (m³/ano)</TableCell>
                <TableCell>N° Poços</TableCell>
                <TableCell>Q Total Outorgada (m³/ano)</TableCell>
                <TableCell >% UTILIZADA</TableCell>
                <TableCell >Vol. Disponível (m³/ano)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">{_hg_analyse._q_ex}</TableCell>
                <TableCell align="center">{_hg_analyse._n_points}</TableCell>
                <TableCell align="center">{_hg_analyse._q_points}</TableCell>
                <TableCell align="center">{_hg_analyse._q_points_per}</TableCell>
                <TableCell align="center">{_hg_analyse._vol_avaiable}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </FormControl>
    </Box>
  )
}
export default ElemAnalyse;