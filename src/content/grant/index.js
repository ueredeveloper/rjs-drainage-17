import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import FormLabel from '@mui/material/FormLabel';
/* icons */
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

import { ElemShowUser } from './elem-show-user';
import { ElemListFlow } from './elem-list-flow';
import { ElemSearchUsers } from './elem-search-users';

import './index.css';
import { Tooltip } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '85%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    p: 4,
};

function ElemGrant({ map, marker, setMarker, data, setData }) {

    console.log('elem grant', marker)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //"demandas": [{ "dt_demandas": { "demanda": [] } }]
    const [search, setSearch] = useState({
        us_nome: "",
        us_cpf_cnpj: "",
        doc_end: 0,
        doc_sei: "",
        proc_sei: "",
    })

    const [users, setUsers] = useState([
        {
            "us_id": 0,
            "us_nome": "",
            "us_cpf_cnpj": "",
            "us_doc_id": 0,
            "doc_end": 0,
            "doc_sei": "",
            "proc_sei": "",
            "end_id": 0,
            "end_log": "",
            "int_latitude": "",
            "int_longitude": "",
            "dt_demanda": {
                "demandas": [],
                "vol_anual_ma": "0"
            }
        }
    ]);

    const handleUserChange = (event) => {
        setMarker(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        });

    };



    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} >
                <Tooltip title="Buscar usuário">
                    <Button color="secondary" onClick={handleOpen}><PersonAddAltIcon /></Button>
                </Tooltip>
            </Box>

            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                {/** Box Geral */}
                <Box sx={style}>

                    {/** Pesquisar usuários */}
                    <ElemSearchUsers map={map} search={search} setSearch={setSearch} setUsers={setUsers} />
                    {/* Listar usuários */}
                    <Box>
                        <FormLabel id="demo-controlled-radio-buttons-group" sx={{ my: 1 }}>Usuário</FormLabel>
                        {/** sx={{ height: 300, maxHeight: 300, marginTop: 2, marginBottom: 2 }}*/}
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ height: 300, maxHeight: 300 }}>

                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ '& .MuiTableCell-sizeMedium': { px: 1, py: 0 } }}>
                                            <TableCell />
                                            <TableCell />
                                            <TableCell>Nome</TableCell>
                                            <TableCell>CPF/CNPJ</TableCell>
                                            <TableCell>Documento</TableCell>
                                            <TableCell>Processo</TableCell>
                                            <TableCell>Endereço</TableCell></TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {users.map((_marker, i) => (
                                            <ElemShowUser
                                                key={'_' + i}
                                                map={map}
                                                marker={_marker}
                                                setMarker={setMarker}
                                                setData={setData}
                                            />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>

                    </Box>
                    {/* Listar a vazão da demanda do usuário selecionado */}
                    <ElemListFlow marker={marker} setMarker={setMarker} />
                </Box>
                {/* fim Box Geral */}

            </Modal>
        </Box>
    );
}

export default ElemGrant;