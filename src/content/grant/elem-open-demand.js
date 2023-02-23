import React, { useEffect, useState} from 'react';
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

    let _q_user = 0;
    dt.dt_demandas.demanda.forEach(dem => {
      _q_user += parseInt(dem.vol_mensal_mm)
    })

    setUser(prev=>{
      return {
        ...prev,
        dt_demandas: dt.dt_demandas, 
        q_user: _q_user

      }
    });

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