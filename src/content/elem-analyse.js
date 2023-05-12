import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ElemGrant from './grant';
import { numberWithCommas } from '../tools';
import { analyseItsAvaiable } from '../tools';
import { makeStyles } from '@mui/styles';
import { Paper } from '@mui/material';


const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
    width: "100%",
  },
}));


function ElemAnalyse({ map, user, setUser, data, setData, grantedRows }) {
  /**
    * Dados sobre a disponibilidade.
    */
  const [_hg_analyse, _setHGAnalyse] = useState(data.system.hg_analyse);

  /**
   * Atualizar a variável _hg_analyse
   */
  useEffect(() => {
    _setHGAnalyse(data.system.hg_analyse)
  }, [data])


  useEffect(() => {
    let __hg_analyse = analyseItsAvaiable(data.system.hg_info, grantedRows)
    _setHGAnalyse(__hg_analyse)

  }, [grantedRows]);

  const classes = useStyles();

  return (
    <Box style={{ display: "flex", flex: 1, flexDirection: 'column' }}>
      <FormControl >
        <Box sx={{ display: 'flex', flexDirection: 'flex-row', justifyContent: 'space-between' }}>
          <FormLabel id="demo-controlled-radio-buttons-group">Análise</FormLabel>
          <ElemGrant map={map} user={user} setUser={setUser} data={data} setData={setData} />
        </Box>
        <Paper elevation={3} style={{ margin: 5 }}>
          <Box style={{ overflowX: "auto" }}>
            <Table className={classes.table} aria-label="simple table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontSize: 12 }}>UH</TableCell>
                  <TableCell align="center" sx={{ fontSize: 12 }}>Sistema</TableCell>
                  <TableCell align="center" sx={{ fontSize: 12 }}>Código</TableCell>
                  <TableCell align="center" sx={{ fontSize: 12 }}>Q Explotável (m³/ano)</TableCell>
                  <TableCell align="center" sx={{ fontSize: 12 }}>N° Poços</TableCell>
                  <TableCell align="center" sx={{ fontSize: 12 }}>Q Total Outorgada (m³/ano)</TableCell>
                  <TableCell align="center" sx={{ fontSize: 12 }}>% UTILIZADA</TableCell>
                  <TableCell align="center" sx={{ fontSize: 12 }}>Vol. Disponível (m³/ano)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">{_hg_analyse.uh}</TableCell>
                  <TableCell align="center">{_hg_analyse.sistema}</TableCell>
                  <TableCell align="center">{_hg_analyse.cod_plan}</TableCell>
                  <TableCell align="center">{numberWithCommas(_hg_analyse.q_ex)}</TableCell>
                  <TableCell align="center">{_hg_analyse.n_points}</TableCell>
                  <TableCell align="center">{numberWithCommas(_hg_analyse.q_points)}</TableCell>
                  <TableCell align="center">{numberWithCommas(_hg_analyse.q_points_per)}</TableCell>
                  <TableCell align="center">{numberWithCommas(_hg_analyse.vol_avaiable)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Paper>
      </FormControl>
    </Box>
  )
}
export default ElemAnalyse;