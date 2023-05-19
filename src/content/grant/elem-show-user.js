import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ElemOpenDemands } from './elem-open-demands';

function ElemShowUser ({ map, setData, marker, setMarker}) {

  //const { row } = props;
  const [open, setOpen] = useState(false);

  
 
  return (
    <React.Fragment>
      {/** main table */}
      <TableRow sx={{ '& .MuiTableCell-sizeMedium': { px: 1, py: 0 } }}>
        <TableCell>
          <IconButton
            color="secondary"
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {marker.name}
        </TableCell>

        <TableCell>{marker.us_nome}</TableCell>
        <TableCell>{marker.us_cpf_cnpj}</TableCell>
        <TableCell>{marker.doc_sei}</TableCell>
        <TableCell>{marker.proc_sei}</TableCell>
        <TableCell>{marker.end_logradouro}</TableCell>

      </TableRow>
      {/** collpsible table */}
      <ElemOpenDemands open={open}  map={map} marker={marker} setMarker={setMarker} setData={setData}/>
    </React.Fragment>
  );
}
export { ElemShowUser }