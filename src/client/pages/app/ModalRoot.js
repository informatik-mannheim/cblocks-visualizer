import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ChartModal from './modalRoot/ChartModal';
import AddMappingModal from './modalRoot/AddMappingModal';
import URLSettingsModal from './modalRoot/URLSettingsModal';
import * as action from '../../action/';

const MODAL_COMPONENTS = {
  CHART: ChartModal,
  ADD_MAPPING: AddMappingModal,
  URL_SETTINGS: URLSettingsModal
};

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

class ModalRoot extends React.Component {
  render () {
    const { modalProps, modalType } = this.props;

    let SpecificModal;

    if (!modalType) {
      return null;
    } else {
      //TODO: Check if modalType exists to avoid type invalid error
      SpecificModal = MODAL_COMPONENTS[modalType];
      return <SpecificModal {...modalProps} hideModal={this.props.hideModal} />;
    }
  }
}

ModalRoot.propTypes = {
  classes: PropTypes.object.isRequired,
  hideModal: PropTypes.func,
  modalProps: PropTypes.object,
  modalType: PropTypes.string
};

const mapDispatchToProps = dispatch => {
  return {
    hideModal: modalType => dispatch(action.hideModal(modalType))
  };
};

export default connect(
  state => state.modals,
  mapDispatchToProps
)(withStyles(styles)(ModalRoot));
