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
import { numberWithCommas } from '../tools';
import { analyseItsAvaiable } from '../tools';

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

  /*
  useEffect(() => {

    let { hg_analyse } = data.system

    let {vol_anual_ma} = user.dt_demanda;


    hg_analyse.n_points += 1;
    // vazão outorgada
    hg_analyse.q_points = (Number(hg_analyse.q_points) + Number(vol_anual_ma)).toFixed(4);
    // percentual de vazão outorgada
    hg_analyse.q_points_per = (Number(hg_analyse.q_points) * 100 / Number(hg_analyse.q_ex)).toFixed(4)
    // volume disponível
    hg_analyse.vol_avaiable = (Number(hg_analyse.vol_avaiable) - Number(vol_anual_ma)).toFixed(4)

    setData(prev => {
      return {
        ...prev,
        system: {
          ...prev.system,
          hg_analyse: hg_analyse
        }
      }
    });

  }, [user]);
  */

  useEffect(() => {
    let __hg_analyse = analyseItsAvaiable(data.system.hg_info, grantedRows)
    _setHGAnalyse(__hg_analyse)

  }, [grantedRows])


  return (
    <Box>
      <FormControl>
        <Box sx={{ display: 'flex', flexDirection: 'flex-row', justifyContent: 'space-between' }}>
          <FormLabel id="demo-controlled-radio-buttons-group" sx={{ my: 1 }}>Análise</FormLabel>
          <ElemGrant map={map} user={user} setUser={setUser} data={data} setData={setData} />
        </Box>
        <TableContainer sx={{ maxHeight: 330 }} component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell align="center">UH</TableCell>
                <TableCell align="center">Sistema</TableCell>
                <TableCell align="center">Código</TableCell>
                <TableCell align="center">Q Explotável (m³/ano)</TableCell>
                <TableCell align="center">N° Poços</TableCell>
                <TableCell align="center">Q Total Outorgada (m³/ano)</TableCell>
                <TableCell align="center">% UTILIZADA</TableCell>
                <TableCell align="center">Vol. Disponível (m³/ano)</TableCell>
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
        </TableContainer>
      </FormControl>
    </Box>
  )
}
export default ElemAnalyse;