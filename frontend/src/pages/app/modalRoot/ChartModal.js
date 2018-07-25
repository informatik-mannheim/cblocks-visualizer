import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import LineChart from '../../../components/LineChart';
import svgIcons from '../../../images/svgIcons';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import * as action from '../../../action/';

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

  handlePin = () => {
    const {objectID, instanceID, resourceID} = this.props;
    this.handleClose();
    this.props.pinChart({objectID, instanceID, resourceID});
  }

  render () {
    const {objectID, instanceID, sensors} = this.props;

    let sensorLabel;
    for (let i = 0; i < sensors.length; i++) {
      const currentSensor = sensors[i];
      if (objectID === currentSensor.objectID && instanceID === currentSensor.instanceID) {
        sensorLabel = currentSensor.name;
      }
    }

    const graphIcon = (
      <SvgIcon>
        <path d={svgIcons.pin} />
      </SvgIcon>
    );

    return (
      <Modal open={this.props.open} onClose={this.handleClose}>
        <div style={getModalStyle()} className={this.props.classes.paper}>
          <Typography variant="title" gutterBottom>
            {sensorLabel}
          </Typography>
          <LineChart displayLegend={true} chartProps={{objectID: this.props.objectID, instanceID: this.props.instanceID, resourceID: this.props.resourceID}}/>
          <div style={{float: 'right'}}>
            <Button variant='fab' mini aria-label="Pin" color='secondary' onClick={this.handlePin}>
              {graphIcon}
            </Button>
          </div>
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
  pinChart: PropTypes.func,
  resourceID: PropTypes.number,
  sensors: PropTypes.array
};

const mapDispatchToProps = (dispatch) => ({
  pinChart: (chartProps) => dispatch(action.pinChart(chartProps))
});

export default connect(state => ({sensors: state.sensors.all_sensors}), mapDispatchToProps)(withStyles(styles)(ChartModal));
