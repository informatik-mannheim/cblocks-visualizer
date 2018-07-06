import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';

class LineChart extends Component {
  render () {
    const {objectID, instanceID, resourceID} = this.props.chartProps;

    const chartData = [];
    let resourceLabel, unit;
    for (let i = 0; i < this.props.sensors.length; i++) {
      const currentSensor = this.props.sensors[i];

      if (objectID === currentSensor.objectID && instanceID === currentSensor.instanceID) {
        const valueHistory = currentSensor.valueHistory;
        for (let j = 0; j < valueHistory.length; j++) {
          //TODO: Check if  valueHistory[j][resourceID] exists
          //TODO: Add check for MultiResources' data structure
          if (valueHistory[j][resourceID]) {
            chartData[j] = valueHistory[j][resourceID];
          } else if (valueHistory.length >= (j + 1)) {
              chartData[j] = valueHistory[j + 1][resourceID];
            } else {
              chartData[j] = valueHistory[j - 1][resourceID];
            }
          resourceLabel = currentSensor.resources[resourceID].name;
          unit = currentSensor.resources[resourceID].schema.unit;
        }
      }
    }

    const labels = [];
    for (let i = 0; i < chartData.length; i++) {
      labels[i] = '';
    }

    const myData = {
      labels: labels,
      datasets: [{
        data: chartData,
        label: resourceLabel + ' in ' + unit,
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
        duration: 100,
        easing: 'linear'
      },
      responsive: false,
      legend: {
        display: this.props.displayLegend,
        position: 'top',
        labels: {
          fontColor: 'rgba(141, 45, 86, 1)'
        }
        },
      scales: {
        yAxes: [{
          ticks: {
              max: Math.max(...chartData) + 0.5,
              min: Math.min(...chartData) - 0.5
          }
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
  chartProps: PropTypes.object,
  displayLegend: PropTypes.bool,
  sensors: PropTypes.array
};

export default connect(state => ({sensors: state.sensors.all_sensors}))(LineChart);
