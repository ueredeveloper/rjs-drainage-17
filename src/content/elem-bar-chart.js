import React, { useState, useEffect } from 'react';

import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale, LinearScale } from 'chart.js';
import { Box, FormControl, Paper, Typography } from '@mui/material';
import { nFormatter } from '../tools';

Chart.register(CategoryScale, LinearScale);



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
    maintainAspectRatio: false,
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
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
    <Box style={{ display: "flex", flex: 3, flexDirection: 'column' }}>
            <FormControl>Gráfico</FormControl>
            <Paper style={{ display: 'flex', flex: 1, padding: 1, margin: 0 }}>
                <Box style={{ width: '100%', height: '100%' }}>
                    <Bar
                        data={data}
                        options={options}
                        width={'100%'}
                        height={'100%'}
                       
                    />
                </Box>
            </Paper>

        </Box>
  );
}

export default ElemBarChart;