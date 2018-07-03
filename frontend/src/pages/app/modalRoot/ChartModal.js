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
    return (
      <Modal open={this.props.open} onClose={this.handleClose}>
        <div style={getModalStyle()} className={this.props.classes.paper}>
          <Typography>TEST</Typography>
          <LineChart/>
        </div>
      </Modal>
    );
  }
}

ChartModal.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  hideModal: PropTypes.func
};

export default withStyles(styles)(ChartModal);
