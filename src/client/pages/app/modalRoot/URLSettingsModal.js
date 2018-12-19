import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
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

class URLSettingsModal extends React.Component {
  handleClose = () => {
    this.props.hideModal('URL_SETTINGS');
  };
  render () {
    return (
      <Modal open={this.props.open} onClose={this.handleClose}>
        <div style={getModalStyle()} className={this.props.classes.paper}>
          HELLO
        </div>
      </Modal>
    );
  }
}

URLSettingsModal.propTypes = {
  classes: PropTypes.object,
  hideModal: PropTypes.func,
  open: PropTypes.bool
};

const mapStateToProps = state => {
  return {}; //TODO: Create URLs reducer... Grab URL state in here
};

const mapDispatchToProps = dispatch => {
  return {}; // TODO: Change URLs here
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(URLSettingsModal));
