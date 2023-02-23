import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(
  us_nome, us_cpf_cnpj, int_processo, emp_endereco, demandas, finalidades) {
  return {
    us_nome,
    us_cpf_cnpj,
    int_processo,
    emp_endereco,
    demandas,
    finalidades
  };
}
/**
* Renderizar as finalidades. Para isso verifica se o objeto contém uma array ou não, depois renderiza de acordo com a quantidade de ítens.
* @param {object} row
*/
function renderPurposes(row) {
  if (row.finalidades !== null) {
    if (Array.isArray(row.finalidades.finalidades)) {
      return row.finalidades.finalidades.map((fin, index) => (
        <TableRow key={index}>
          <TableCell component="th" scope="row">
            {fin.id_finalidade}
          </TableCell>
          <TableCell component="th" scope="row">
            {fin.descricao}
          </TableCell>
          <TableCell>{fin.vazao}</TableCell>
          <TableCell >{fin.id_interferencia}</TableCell>
          <TableCell >
            {/*Math.round(fin.amount * row.price * 100) / 100*/}
          </TableCell>
        </TableRow>

      ))
    } else {
      return (
        <TableRow>
          <TableCell component="th" scope="row">
            {row.finalidades.finalidades.id_finalidade}
          </TableCell>
          <TableCell component="th" scope="row">
            {row.finalidades.finalidades.descricao}
          </TableCell>
          <TableCell>{row.finalidades.finalidades.vazao}</TableCell>
          <TableCell >{row.finalidades.finalidades.id_interferencia}</TableCell>
          <TableCell >
            {/*Math.round(fin.amount * row.price * 100) / 100*/}
          </TableCell>
        </TableRow>
      )
    }
  }

}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        {/* icon down up*/}
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {/** points */}
        <TableCell >{row.us_nome}</TableCell>
        <TableCell >{row.us_cpf_cnpj}</TableCell>
        <TableCell >{row.int_processo}</TableCell>
        <TableCell >{row.emp_endereco}</TableCell>
        {/** vazões */}
        {
          row.demandas.demandas.map((dem, i) => {
            return (
              <TableCell key={i} >{parseFloat(dem.vol_mensal_mm).toFixed(2)}</TableCell>
            )
          })
        }
      </TableRow>
      <TableRow>
        {/** finalidades */}
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {/* Detalhes - Título */}
              <Typography variant="h6" gutterBottom component="div">
                Finalidades
              </Typography>
              <Table size="small" aria-label="purchases">
                {/* th - table head */}
                <TableHead>
                  <TableRow>
                    <TableCell>Id Finalidade</TableCell>
                    <TableCell>Finalidade</TableCell>
                    <TableCell >Vazão</TableCell>
                    <TableCell >Id Interferência</TableCell>
                  </TableRow>
                </TableHead>
                {/*tbody - table body */}
                <TableBody>
                  {renderPurposes(row)}
                </TableBody>

              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function ElemListGrants({ points }) {

  const [rows, setRows] = useState([createData('', '', '', '', { demandas: [] }, { finalidades: [] })])

  const _setRows = (points) => {
    let _points = points.map(o => {
      return createData(
        o.us_nome,
        o.us_cpf_cnpj,
        o.int_processo,
        o.emp_endereco,
        o.demandas,
        o.finalidades
      )
    })
    setRows(_points);
  }


  useEffect(() => {
    if (points.length !== 0) _setRows(points);
  }, [points]);

  return (
    <TableContainer sx={{ maxHeight: 330 }} component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Nome</TableCell>
            <TableCell>CPF/CNPJ</TableCell>
            <TableCell>Processo</TableCell>
            <TableCell >Endereço</TableCell>
            {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'].map((month, i) => {
              return (
                <TableCell key={i}>{month}</TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        {<TableBody>
          {rows.map((row, i) => (
            <Row key={i} row={row} />
          ))}
        </TableBody>}
      </Table>
    </TableContainer>
  );
}
export default ElemListGrants;