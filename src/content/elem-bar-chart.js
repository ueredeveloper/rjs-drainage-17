import React, { useState, useEffect } from 'react';

import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { nFormatter } from '../tools';

function ElemBarChart({ hg_analyse }) {

  /**
  * Dados sobre a disponibilidade.
  */
  console.log(hg_analyse)
  const [_hg_analyse, _setHGAnalyse] = useState(hg_analyse);

  useEffect(() => {
    _setHGAnalyse(hg_analyse)
  }, [hg_analyse])

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZer: 0,
        position: 'left',
        ticks: {
          callback: function (value) {
            return nFormatter(value, 1)
          }
        }
      },
      percentage: {
        beginAtZer: 0,
        position: 'right',
        grid: {
          drawOnChartArea: false
        },
        ticks: {
          callback: function (value) {
            return `${value}%`

          }
        }
      }
    },
    plugins: {

      title: {
        display: true,
        text: 'Disponibilidade',
      }
    },
  };

  const data = {
    labels: ['Subsistema', 'Outorgados'],
    datasets:
      [
        {
          label: '',

          data: [_hg_analyse._q_ex, _hg_analyse._q_points],
          type: 'line',
          backgroundColor: 'aqua',
          borderColor: 'black',
          borderWidth: 1,

        },
        {
          label: 'Vazão',
          id: "A",
          backgroundColor: 'green',
          data: [_hg_analyse._q_ex, _hg_analyse._q_points],
        }, {
          label: 'Porcentagem',
          yAxisID: 'percentage',
          backgroundColor: 'red',
          data: [_hg_analyse._q_ex_per, _hg_analyse._q_points_per],
        }
      ]
  };

  return (
    <div>
      {/** responsividade css => h-52...*/}
      <Bar style={{ height: '13rem', minHeight: '13rem', maxHeight: '13rem', width: '100%', maxWidth: '100%' }}
        options={options} data={data} />
    </div>
  );
}

export default ElemBarChart;