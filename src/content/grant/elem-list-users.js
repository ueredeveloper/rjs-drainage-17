import React, {useEffect, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ElemOpenDemand } from './elem-open-demand';

function ElemListUsers({row, getDemandas, setUser}) {
  //const { row } = props;
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    if(open){
      getDemandas(row.end_id)
    }
  }, [open])

  return (
    <React.Fragment>
      <TableRow sx={{ '& .MuiTableCell-sizeMedium': { px: 1, py: 0 } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>{row.us_nome}</TableCell>
        <TableCell>{row.us_cpf_cnpj}</TableCell>
        <TableCell>{row.doc_sei}</TableCell>
        <TableCell>{row.proc_sei}</TableCell>
        <TableCell>{row.end_logradouro}</TableCell>

      </TableRow>
      <ElemOpenDemand open={open} row={row} setUser={setUser}/>

    </React.Fragment>
  );
}
export { ElemListUsers }