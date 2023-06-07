import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ElemGrant from './grant/elem-grant';
import { numberWithCommas } from '../tools';
import { analyseItsAvaiable } from '../tools';
import { makeStyles } from '@mui/styles';
import { CssBaseline, Paper, ScopedCssBaseline, TablePagination, Tooltip, Typography } from '@mui/material';
import { SystemContext } from './elem-content';


const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
  },
  box: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    my: 1,
  },
  typography: {
    fontSize: 14,
    wordBreak: 'break-word',
    mx: 5,
  },
  tableCell: {
    p: 2,
    fontSize: 12,
  }
}));


function ElemAnalyse() {
  /**
    * Dados sobre a disponibilidade.
    */
  const [{ hg_analyse }] = useContext(SystemContext);


  const classes = useStyles();

  return (
    <Box sx={classes.container}>
      <Box sx={{ display: 'flex', flexDirection: 'flex-row', justifyContent: 'space-between' }}>
        <FormLabel id="demo-controlled-radio-buttons-group" sx={{ my: 1 }}>Análise</FormLabel>
        {
          <ElemGrant />
        }
      </Box>
      <Paper>
        <Box sx={classes.box}>
          <Typography sx={classes.typography}>Bacia Hidrográfica: {hg_analyse.bacia_nome}</Typography>
          <Typography sx={classes.typography}>Unidade Hidrográfica: {hg_analyse.uh_nome}</Typography>
          <Typography sx={classes.typography}>{hg_analyse.uh_label}</Typography>
        </Box>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table" size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={classes.tableCell}>Sistema</TableCell>
                <TableCell align="center" sx={classes.tableCell}>Código</TableCell>
                <TableCell align="center" sx={classes.tableCell}>Q Explotável (m³/ano)</TableCell>
                <TableCell align="center" sx={classes.tableCell}>N° Poços</TableCell>
                <TableCell align="center" sx={classes.tableCell}>Q Total Outorgada (m³/ano)</TableCell>
                <TableCell align="center" sx={classes.tableCell}>% UTILIZADA</TableCell>
                <TableCell align="center" sx={classes.tableCell}>Vol. Disponível (m³/ano)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center" sx={classes.tableCell}>{hg_analyse.sistema}</TableCell>
                <TableCell align="center" sx={classes.tableCell}>{hg_analyse.cod_plan}</TableCell>
                <TableCell align="center" sx={classes.tableCell}>{numberWithCommas(hg_analyse.q_ex)}</TableCell>
                <TableCell align="center" sx={classes.tableCell}>{hg_analyse.n_points}</TableCell>
                <TableCell align="center" sx={classes.tableCell}>{numberWithCommas(hg_analyse.q_points)}</TableCell>
                <TableCell align="center" sx={classes.tableCell}>{numberWithCommas(hg_analyse.q_points_per)}</TableCell>
                <TableCell align="center" sx={classes.tableCell}>{numberWithCommas(hg_analyse.vol_avaiable)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}
export default ElemAnalyse;