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
import { getDemandas } from '../../services/shapes';
import { ElemListUsers } from './elem-list-users';
import { ElemListFlow } from './elem-list-flow';
import { ElemSearchUser } from './elem-search-user';

import './index.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    p: 4,
};

function ElemGrant() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    /* mudar, pois aqui o que importa é só da demanda, a palavra user não interesa neste momento */
    const [user, setUser] = useState({
        "us_nome": "",
        "us_cpf_cnpj": "",
        "doc_end": 0,
        "doc_sei": "123",
        "proc_sei": "",
        "dt_demandas": { "demanda": [] }
    });
    //"demandas": [{ "dt_demandas": { "demanda": [] } }]
    const [search, setSearch] = useState({
        us_nome: "",
        us_cpf_cnpj: "",
        doc_end: 0,
        doc_sei: "123",
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
            "demandas": [{ "dt_demandas": { "demanda": [] } }]
        }
    ])

    useEffect(() => {
        console.log('user dem', user.dt_demandas)
    })

    const handleUserChange = (event) => {
        setUser(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        });
    };

    async function _getDemandas(end_id) {
        let _demandas = await getDemandas(end_id);

        let _users = users.map(user => {
            // adicionar demandas ao endereço específico
            if (user.end_id === end_id) {
                return { ...user, demandas: _demandas }
            }
            return user;
        })
        setUsers(_users)
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} >
                <Button onClick={handleOpen}><PersonAddAltIcon /></Button>
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

                    {/** Pesquisa */}
                    <ElemSearchUser search={search} setSearch={setSearch} setUsers={setUsers} />
                    {/* Resultado da Busca de Usuários */}
                    <Box>
                        <FormLabel id="demo-controlled-radio-buttons-group">Usuário</FormLabel>
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
                                        {users.map((row, i) => (
                                            <ElemListUsers key={'_' + i} row={row} getDemandas={_getDemandas} setUser={setUser} />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>

                    </Box>

                    {/* Vazão do usuário selecionado */}
                    <ElemListFlow user={user} setUser={setUser} />
                </Box>
                {/* fim Box Geral */}

            </Modal>
        </Box>
    );
}

export default ElemGrant;