import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';

export default {
    generateChart(container){
        return new Chart(container, {
            type: 'line',
            data: {
              datasets: [{
                label: '# of Votes',
                data: [{x: new Date('2016-12-25 00:00'), y: 20}, {x: new Date('2016-12-27 00:00'), y: 10}],
                borderWidth: 1
              },
              {
                label: '# of Votes',
                data: [{x: new Date('2016-12-25 00:00'), y: 15}, {x: new Date('2016-12-27 00:00'), y: 30}],
                borderWidth: 1
              }
            ]
            },
            options: {
              maintainAspectRatio: false,
              responsive: true,
              hover: {
                mode: 'index',
                intersec: false
              },
              plugins: {
                tooltip: {
                  mode: 'index',
                  intersect: false
                },
                legend:{
                    position: 'bottom'
                }
              },
              scales: {
                x:{
                    type: 'time',
                    time: {
                        unit: 'day' // Customize the time unit as needed (e.g., 'minute', 'day', etc.)
                    }
                },
                y: {
                  beginAtZero: true
                }
              }
            }
        });
    }
}