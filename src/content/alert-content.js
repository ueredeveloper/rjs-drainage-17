import React from 'react';
import { Box, Alert, Collapse } from '@mui/material';

/**
 * Componente de alerta comum.
 * Exibe uma mensagem de erro dentro de um alerta colapsável.
 * 
 * @component
 * @param {Object} props - As propriedades do componente.
 * @param {boolean} props.openAlert - Define se o alerta deve ser exibido ou não.
 * @param {string} props.alertMessage - A mensagem a ser exibida dentro do alerta.
 * @param {function} props.setOpen - Função para atualizar o estado do alerta.
 * @returns {JSX.Element} O componente JSX do alerta.
 */
export default function AlertContent({ openAlert, alertMessage, setOpen }) {

  console.log('alert')
  return (
    <Box
      sx={{
        position: 'fixed', // Alerta fixo na tela
        top: 10, // Distância do topo
        left: '50%', // Centraliza horizontalmente
        transform: 'translateX(-50%)', // Ajusta para o centro exato
        width: 'auto',
        zIndex: 1000, // Garante que o alerta fique acima de outros componentes
      }}
    >
      <Collapse in={openAlert}>
        <Alert 
          variant="filled" 
          severity="error" 
          sx={{ mb: 2 }} 
          onClose={() => setOpen(false)} // Adiciona a funcionalidade de fechar
        >
          {alertMessage}
        </Alert>
      </Collapse>
    </Box>
  );
}
