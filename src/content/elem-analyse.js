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

function ElemAnalyse({ map, data, setData }) {
  /**
    * Dados sobre a disponibilidade.
    */
  const [_hg_analyse, _setHGAnalyse] = useState(data.system.hg_analyse);

  /* mudar, pois aqui o que importa é só da demanda, a palavra user não interesa neste momento */
  const [user, setUser] = useState({
    "us_nome": "",
    "us_cpf_cnpj": "",
    "doc_end": 0,
    "doc_sei": "123",
    "proc_sei": "",
    "dt_demandas": { "demanda": [] },
    "q_user": 0
  });
  /**
   * Atualizar a variável _hg_analyse
   */
  useEffect(() => {
    _setHGAnalyse(data.system.hg_analyse)
  }, [data])

  useEffect(() => {

    let { hg_analyse } = data.system

    hg_analyse._n_points += 1
    hg_analyse._q_points = (Number(hg_analyse._q_points) + Number(user.q_user)).toFixed(4)
    hg_analyse._q_points_per = (Number(hg_analyse._q_points) * 100 / Number(hg_analyse._q_ex)).toFixed(4)
    hg_analyse._vol_avaiable = (Number(hg_analyse._vol_avaiable) - Number(user.q_user)).toFixed(4)

    setData(prev => {
      return {
        ...prev,
        system: {
          ...prev.system,
          hg_analyse: hg_analyse
        }
      }
    });
  }, [user])
  /**
   * Mudar ponto por vírgula em um número
   * @param {*} number 
   * @returns 
   */
  function replaceDotToComma(number) {
    if (typeof number === 'number') {
      let _n = number.toString();
      return _n.replace(".", ",")
    }
    return number.replace(".", ",")
  }

  return (
    <Box>
      <FormControl>
        <Box sx={{ display: 'flex', flexDirection: 'flex-row', justifyContent: 'space-between' }}>
          <FormLabel id="demo-controlled-radio-buttons-group">Análise</FormLabel>
          <ElemGrant map={map} user={user} setUser={setUser} data={data} setData={setData} />
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
                <TableCell align="center">{replaceDotToComma(_hg_analyse._q_ex)}</TableCell>
                <TableCell align="center">{_hg_analyse._n_points}</TableCell>
                <TableCell align="center">{replaceDotToComma(_hg_analyse._q_points)}</TableCell>
                <TableCell align="center">{replaceDotToComma(_hg_analyse._q_points_per)}</TableCell>
                <TableCell align="center">{replaceDotToComma(_hg_analyse._vol_avaiable)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </FormControl>
    </Box>
  )
}
export default ElemAnalyse;