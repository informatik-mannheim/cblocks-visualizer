import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

class LineChart extends Component {
  render () {
    const labels = [];
    for (let i = 0; i < 100; i++) {
      labels[i] = '';
    }
    //TODO: create sensible data in ChartModal
    const myData = {
      labels: labels,
      datasets: [{
        data: this.props.data,
        label: this.props.resourceLabel,
        fillColor: 'rgba(163, 68, 93, 0.5)',
				strokeColor: 'rgba(141, 45, 86, 1)',
				pointColor: 'rgba(43, 25, 62, 1)',
        pointRadius: 0,
        borderWidth: 2,
        backgroundColor: 'rgba(163, 68, 93, 0.5)',
        borderColor: 'rgba(141, 45, 86, 1)',
				pointStrokeColor: '#fff'
      }]
    };

    const options = {
      animation: {
        duration: 500,
        easing: 'linear'
      },
      responsive: false,
      legend: {
        display: true,
        labels: {
          fontColor: 'rgba(141, 45, 86, 1)'
        }
        },
      scales: {
        yAxes: [{
          // ticks: {
          //     max: 1,
          //     min: -1
          // }
        }],
        xAxes: [{
          display: false
        }]
      }
    };

    return (
      <div>
        <Line
          data={myData}
          options={options}
        />
      </div>
    );
  }
}

LineChart.propTypes = {
  data: PropTypes.array,
  resourceLabel: PropTypes.string,
  sensorLabel: PropTypes.string,
  unit: PropTypes.string
};

export default LineChart;
