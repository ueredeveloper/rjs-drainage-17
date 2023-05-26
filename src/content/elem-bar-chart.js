import React, { useState, useEffect, useContext } from 'react';

import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale, LinearScale } from 'chart.js';
import { Box, FormControl, FormLabel, Paper, Switch, Tooltip, Typography } from '@mui/material';
import { nFormatter } from '../tools';
import { SystemContext } from './elem-content';

// Registra as escalas de categoria e linear para uso no gráfico
Chart.register(CategoryScale, LinearScale);

/**
 * Componente de gráfico de barras.
 *
 * @param {Object} props - Propriedades do componente.
 * @param {string} props.theme - Tema do gráfico.
 * @param {Object} props.marker - Informações do usuário.
 * @param {Object} props.hg_analyse - Dados sobre a disponibilidade.
 * @returns {JSX.Element} Elemento JSX que representa o gráfico de barras.
 */
function ElemBarChart() {
  // Define o estado interno hg_analyse e a função para atualizá-lo
  //const [hg_analyse, _setHGAnalyse] = useState(hg_analyse);
  const [context] = useContext(SystemContext);

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
        data: [context.hg_analyse.q_ex],
        backgroundColor: '#4E79A7',
        borderWidth: 1,
      },
      {
        label: 'Q Outorgada',
        backgroundColor: '#F28E2B',
        data: [context.hg_analyse.q_points],
      },
      {
        label: 'Q Disponível',
        backgroundColor: '#E15759',
        data: [context.hg_analyse.q_ex - context.hg_analyse.q_points],
      },
      {
        label: 'Q Usuário',
        backgroundColor: '#76B7B2',
        // se não há cadastros preencha com zero
        data: [context.markers.length!==0? context.markers[0].dt_demanda.vol_anual_ma: 0],
      },
    ],
  };

  return (
    <Box id="chart-box" sx={{ display: "flex", flex: 1, flexDirection: 'column' }}>
      <FormLabel id="demo-controlled-radio-buttons-group" sx={{ my: 1 }}>Gráfico</FormLabel>
      <Paper id="chart-paper" elevation={3} sx={{ flex: 1, m: 1, alignItems: 'stretch' }} >
        <Box id="char-bar-box" sx={{ display: 'flex', mx: 2 }}>
          <Bar
            data={data}
            options={options}
            style={{ minHeight: 130, height: '40%', width: '40%' }}
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