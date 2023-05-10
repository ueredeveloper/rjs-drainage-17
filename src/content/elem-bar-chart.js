import React, { useState, useEffect } from 'react';

import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { nFormatter } from '../tools';
import { FormLabel, Paper } from '@mui/material';
import { Box } from '@mui/system';

function ElemBarChart({ theme, user, hg_analyse }) {

  /**
  * Dados sobre a disponibilidade.
  */
  const [_hg_analyse, _setHGAnalyse] = useState(hg_analyse);


  useEffect(() => {
    _setHGAnalyse(hg_analyse)

  }, [hg_analyse])

  const options = {
    responsive: true,
    scales: {
      y: {
        type: 'logarithmic',
        position: 'left',
        ticks: {
          callback: function (value) {
            return nFormatter(value, 1)
          }
        }
      }
    },
    plugins: {

      title: {
        display: false,
        text: '',
      }
    },
  };

  const data = {
    labels: [''],
    datasets:
      [
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
        }, {
          label: 'Q Disponível',
          backgroundColor: '#E15759',
          data: [hg_analyse.q_ex - hg_analyse.q_points],
        },
        {
          label: 'Q Usuário',
          backgroundColor: '#76B7B2',
          data: [user.dt_demanda.vol_anual_ma],
        }
      ]
  };

  return (
    <Box sx={{my: 1}}>
      <FormLabel sx={{my: 1}}>Balanço Hídrico</FormLabel>
      <Paper elevation={3} sx={{ padding: 1}}>
        {/** responsividade css => h-52...*/}
        <Bar style={{ display: 'inline', marginTop: 4, height: '8rem', minHeight: '8rem', maxHeight: '8rem', width: '100%', maxWidth: '100%' }}
          options={options} data={data} />
      </Paper>
    </Box>
  );
}

export default ElemBarChart;