import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import * as action from '../../../action/';
import NewMappingForm from './addMappingModal/NewMappingForm';
import Typography from '@material-ui/core/Typography';

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

class AddMappingModal extends Component {

  handleClose = () => {
    this.props.hideModal('ADD_MAPPING');
  };

  render () {
    return (
      <Modal open={this.props.open} onClose={this.handleClose}>
        <div style={getModalStyle()} className={this.props.classes.paper}>
          <Typography variant='headline' style={{marginTop: -10}}>
            Create New Mapping
          </Typography>
          <NewMappingForm {...this.props}/>
        </div>
      </Modal>
    );
  }
}

AddMappingModal.propTypes = {
  classes: PropTypes.object,
  hideModal: PropTypes.func,
  instanceID: PropTypes.number,
  objectID: PropTypes.number,
  open: PropTypes.bool.isRequired,
  resourceID: PropTypes.number
};

const mapDispatchToProps = (dispatch) => ({
  pinChart: (chartProps) => dispatch(action.pinChart(chartProps))
});

export default connect(state => ({sensors: state.sensors.all_sensors}), mapDispatchToProps)(withStyles(styles)(AddMappingModal));
