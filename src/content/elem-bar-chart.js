import React, { useState, useEffect } from 'react';

import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale, LinearScale } from 'chart.js';
import { Box, FormControl, FormLabel, Paper, Switch, Tooltip, Typography } from '@mui/material';
import { nFormatter } from '../tools';

// Registra as escalas de categoria e linear para uso no gráfico
Chart.register(CategoryScale, LinearScale);

/**
 * Componente de gráfico de barras.
 *
 * @param {Object} props - Propriedades do componente.
 * @param {string} props.theme - Tema do gráfico.
 * @param {Object} props.user - Informações do usuário.
 * @param {Object} props.hg_analyse - Dados sobre a disponibilidade.
 * @returns {JSX.Element} Elemento JSX que representa o gráfico de barras.
 */
function ElemBarChart({ theme, user, hg_analyse }) {
  // Define o estado interno _hg_analyse e a função para atualizá-lo
  const [_hg_analyse, _setHGAnalyse] = useState(hg_analyse);

  // Define o estado interno checked e a função para atualizá-lo. Se true, escala logarítimica, se false, linear.
  const [checked, setChecked] = useState(false);

  /**
   * Função chamada quando o valor do Switch é alterado.
   *
   * @param {Object} event - Objeto do evento de alteração.
   */
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  // Efeito executado quando hg_analyse é atualizado
  useEffect(() => {
    _setHGAnalyse(hg_analyse);

    //console.log(hg_analyse, user)
  }, [hg_analyse]);

  // Opções de configuração do gráfico
  const options = {
    responsive: true,
    scales: {
      y: {
        // uso de escala logarítmica ou não
        type: checked ? 'logarithmic' : 'linear',
        position: 'left',
        ticks: {
          callback: function (value) {
            return nFormatter(value, 1);
          },
        },
      },
    },
    plugins: {
      title: {
        display: false,
        text: '',
      },
    },
    maintainAspectRatio: false,
  };

  // Dados do gráfico
  const data = {
    labels: [''],
    datasets: [
      {
        label: 'Q Explotável',
        data: [hg_analyse.q_ex],
        backgroundColor: '#4E79A7',
        borderWidth: 1,
      },
      {
        label: 'Q Outorgada',
        backgroundColor: '#F28E2B',
        data: [hg_analyse.q_points],
      },
      {
        label: 'Q Disponível',
        backgroundColor: '#E15759',
        data: [hg_analyse.q_ex - hg_analyse.q_points],
      },
      {
        label: 'Q Usuário',
        backgroundColor: '#76B7B2',
        data: [user.dt_demanda.vol_anual_ma],
      },
    ],
  };

  return (
    <Box style={{ display: "flex", flex: 2, flexDirection: 'column' }}>
      <FormLabel id="demo-controlled-radio-buttons-group" sx={{ my: 1 }}>Gráfico</FormLabel>
      <Paper elevation={3} style={{ display: 'flex', flex: 1, padding: 1, margin: 0 }}>
        <Box style={{ width: '100%', height: '100%' }}>
          <Bar
            data={data}
            options={options}
            style={{ display: 'inline', marginTop: 4, height: '13rem', minHeight: '13rem', maxHeight: '13rem', width: '100%', maxWidth: '100%' }}

          />
        </Box>
        <Tooltip title="Escala logarítimica">
          <Switch
            checked={checked}
            size="small"
            onChange={handleChange}
            color="secondary"
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Tooltip>
      </Paper>

    </Box>
  );
}

export default ElemBarChart;