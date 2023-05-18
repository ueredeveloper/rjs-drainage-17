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
import { CssBaseline, Paper, ScopedCssBaseline, Tooltip, Typography } from '@mui/material';


const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 100,
    width: "100%",
  },
}));


function ElemAnalyse({ map, user, setUser, data, setData, selectedRows }) {
  /**
    * Dados sobre a disponibilidade.
    */
  const [hg_analyse, setAnalyse] = useState(data.system.hg_analyse);

  /**
   * Atualizar a variável hg_analyse
   */
  useEffect(() => {
    setAnalyse(data.system.hg_analyse)
  }, [data])


  useEffect(() => {
    let _hg_analyse = analyseItsAvaiable(data.system.hg_info, selectedRows)
    setAnalyse(_hg_analyse)

  }, [selectedRows]);

  const classes = useStyles();

  return (
    <Box sx={{ display: "flex", flexDirection: 'column' }}>
      <FormControl >
        <Box sx={{ display: 'flex', flexDirection: 'flex-row', justifyContent: 'space-between' }}>
          <FormLabel id="demo-controlled-radio-buttons-group" sx={{ my: 1 }}>Análise</FormLabel>
        
          <ElemGrant map={map} user={user} setUser={setUser} data={data} setData={setData} />
        
        </Box>

        <Paper id="table-paper" elevation={3} sx={{ margin: 1, overflow: 'auto' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', my: 1 }}>
            <Typography sx={{ fontSize: 14 }}>Bacia Hidrográfica: {hg_analyse.bacia_nome}</Typography>
            <Typography sx={{ fontSize: 14 }}>Unidade Hidrográfica: {hg_analyse.uh_nome} </Typography>
            <Typography sx={{ fontSize: 14 }}>{hg_analyse.uh_label} </Typography>
          </Box>
          <Table className={classes.table} aria-label="simple table" size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ p: 2, fontSize: 12 }}>Sistema</TableCell>
                <TableCell align="center" sx={{ p: 2, fontSize: 12 }}>Código</TableCell>
                <TableCell align="center" sx={{ p: 2, fontSize: 12 }}>Q Explotável (m³/ano)</TableCell>
                <TableCell align="center" sx={{ p: 2, fontSize: 12 }}>N° Poços</TableCell>
                <TableCell align="center" sx={{ p: 2, fontSize: 12 }}>Q Total Outorgada (m³/ano)</TableCell>
                <TableCell align="center" sx={{ p: 2, fontSize: 12 }}>% UTILIZADA</TableCell>
                <TableCell align="center" sx={{ p: 2, fontSize: 12 }}>Vol. Disponível (m³/ano)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center" sx={{ p: 2 }}>{hg_analyse.sistema}</TableCell>
                <TableCell align="center" sx={{ p: 2 }}>{hg_analyse.cod_plan}</TableCell>
                <TableCell align="center" sx={{ p: 2 }}>{numberWithCommas(hg_analyse.q_ex)}</TableCell>
                <TableCell align="center" sx={{ p: 2 }}>{hg_analyse.n_points}</TableCell>
                <TableCell align="center" sx={{ p: 2 }}>{numberWithCommas(hg_analyse.q_points)}</TableCell>
                <TableCell align="center" sx={{ p: 2 }}>{numberWithCommas(hg_analyse.q_points_per)}</TableCell>
                <TableCell align="center" sx={{ p: 2 }}>{numberWithCommas(hg_analyse.vol_avaiable)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </FormControl>
    </Box>
  )
}
export default ElemAnalyse;