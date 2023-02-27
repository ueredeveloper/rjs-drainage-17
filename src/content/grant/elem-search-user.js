import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
/* icons */
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { searchUsers } from '../../services/search';

function ElemSearchUser({ map, search, setSearch, setUsers }) {

  const handleUserChange = (event) => {
    setSearch(prev => {
      return {
        ...prev,
        [event.target.name]: event.target.value
      }
    });
  };

  /**
  * Buscar pontos de outorga no banco de dados azure, utilizado para criar parecer e outros atos.
  * @param {string} us_nome Nome do usuário.
  * @param {string} us_cpf_cnpj CPF ou CNPJ do usuário.
  * @param {string} doc_sei Documento no sistema SEI.
  * @param {string} prc_sei Processo.
  */
  async function _searchUsers() {
    let users = await searchUsers(search.us_nome,
      search.us_cpf_cnpj,
      search.doc_sei,
      search.proc_sei);

    let _users = users.map(user => {
      user.demandas = []
      return user;
    })
    setUsers(_users)
  }

  return (
    <Box sx={{pt: 0}}>
      <FormLabel id="demo-controlled-radio-buttons-group">Pesquisa</FormLabel>
      <Box sx={{ display: 'flex', flexDirection: 'flex-row', justifyContent: 'space-between', marginTop: 2, marginBottom: 2 }}>
        {/* Pesquisa de Usários*/}
        <Box  sx={{ display: 'flex', flexDirection: 'flex-row'}}>
          <Box sx={{marginLeft: '1rem', marginRight: '1rem'}}>
            <TextField id="us_nome"
              name="us_nome"
              value={search.us_nome}
              label="Usuário"
              variant="standard"
              onChange={handleUserChange} />
          </Box>
          <Box sx={{marginLeft: '1rem', marginRight: '1rem'}}>
            <TextField id="us_cpf_cnpj"
              name="us_cpf_cnpj"
              value={search.us_cpf_cnpj}
              label="CPF/CNPJ"
              variant="standard"
              onChange={handleUserChange} />
          </Box>
          <Box sx={{marginLeft: '1rem', marginRight: '1rem'}}>
            <TextField id="doc_sei"
              name="doc_sei"
              value={search.doc_sei}
              label="Documento"
              variant="standard"
              onChange={handleUserChange} />


          </Box>
          <Box sx={{marginLeft: '1rem', marginRight: '1rem'}}>
            <TextField id="proc_sei"
              name="proc_sei"
              value={search.proc_sei}
              label="Processo"
              variant="standard"
              onChange={handleUserChange} />
          </Box>
          <IconButton color="secondary" size="large" onClick={() => {
            _searchUsers()

          }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>

    </Box>

  )
}


export { ElemSearchUser }
