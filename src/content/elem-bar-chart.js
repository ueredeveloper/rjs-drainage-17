import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { nFormatter } from '../tools';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export default function ElemBarChart({ hg_analyse }) {

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
        beginAtZer: 0,
        position: 'left',
        ticks: {
          callback: function(value) {
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
          callback: function(value) {
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
      <Bar className='h-52 min-h-52 max-h-52 w-full max-w-full' options={options} data={data} />
    </div>
  );
}
