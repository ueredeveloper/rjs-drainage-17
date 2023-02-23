import * as React from 'react';
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

function ElemOpenDemand({ open, row, user, setUser, data, setData }) {

  function onClick(dt) {
    setUser(prev=>{
      return {
        ...prev,
        dt_demandas: dt.dt_demandas
      }
    });

    
    let _vol_anual = 0;
    user.dt_demandas.demanda.forEach(dem => {
        _vol_anual += parseInt(dem.vol_mensal_mm)
    })

    let {_n_points,_q_ex,_q_ex_per,_q_points, _q_points_per,_vol_avaiable} = data.system.hg_analyse
    // somar ponto analizado
    let __n_points = _n_points + 1
    // somatório das vazões anuais mais a vazão anual do usuário
    let __q_points = _q_points + _vol_anual
    //  porcentagem -> regra de três
    let __q_points_per = __q_points * 100 / _q_ex
    // subtrair do volume disponível o volume do usuário
    let __vol_avaiable = _vol_avaiable - _vol_anual

    setData(prev => {
        return {
            ...prev,
            system: {
                ...prev.system,
                ...prev.system.hg_analyse._n_points = __n_points,
                ...prev.system.hg_analyse._q_points = __q_points,
                ...prev.system.hg_analyse._q_points_per = __q_points_per,
                ...prev.system.hg_analyse._vol_avaiable = __vol_avaiable
            }
        }

    });

    console.log('ele open click ')
  }

  return (
    <TableRow>
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
                    <TableRow key={"____" + i}>
                      <TableCell component="th" scope="row">
                        {dt.int_latitude}
                      </TableCell>
                      <TableCell>{dt.int_longitude}</TableCell>
                      <TableCell>{dt.int_longitude}</TableCell>
                      <TableCell>{dt.int_longitude}</TableCell>
                      <TableCell><IconButton size="large" onClick={() => { onClick(dt) }}>
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