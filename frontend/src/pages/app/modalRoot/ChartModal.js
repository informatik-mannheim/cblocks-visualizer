import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import LineChart from './ChartModal/LineChart';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
};

class ChartModal extends Component {

  handleClose = () => {
    this.props.hideModal('CHART');
  };

  render () {
    const {objectID, instanceID, resourceID, sensors} = this.props;

    const chartData = [];
    let sensorLabel, resourceLabel, unit;
    for (let i = 0; i < sensors.length; i++) {
      const currentSensor = sensors[i];
      sensorLabel = currentSensor.name;
      if (objectID === currentSensor.objectID && instanceID === currentSensor.instanceID) {
        const valueHistory = currentSensor.valueHistory;
        for (let j = 0; j < valueHistory.length; j++) {
          //TODO: Check if  valueHistory[j][resourceID] exists
          //TODO: Add check for MultiResources' data structure
          chartData[j] = valueHistory[j][resourceID];
          resourceLabel = currentSensor.resources[resourceID].name;
          unit = currentSensor.resources[resourceID].schema.unit;
        }
      }
    }

    return (
      <Modal open={this.props.open} onClose={this.handleClose}>
        <div style={getModalStyle()} className={this.props.classes.paper}>
          <LineChart data={chartData} sensorLabel={sensorLabel} resourceLabel={resourceLabel} unit={unit}/>
        </div>
      </Modal>
    );
  }
}

ChartModal.propTypes = {
  classes: PropTypes.object,
  hideModal: PropTypes.func,
  instanceID: PropTypes.number,
  objectID: PropTypes.number,
  open: PropTypes.bool,
  resourceID: PropTypes.number,
  sensors: PropTypes.array
};

export default connect(state => ({sensors: state.sensors.all_sensors}))(withStyles(styles)(ChartModal));
