import React from 'react';
import PropTypes from 'prop-types';
import * as action from '../../action/';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

class SwitchResource extends React.Component {

  handleChange = (field, value) => {
    if (this.props.isWriteable === true) {
      this.props.toggleSwitch(this.props.objectID, this.props.instanceID, this.props.resource.resourceID, this.props.currentValue);
    }
  };

  render () {
    return (
      <div>
        <Typography variant='subheading' align='center'>{this.props.resource.name}</Typography>
          <Switch
            checked={this.props.currentValue}
            onChange={this.handleChange.bind(this, 'switch')}
          />
      </div>
    );
  }
}

SwitchResource.propTypes = {
  currentValue: PropTypes.any,
  instanceID: PropTypes.number,
  isWriteable: PropTypes.bool,
  objectID: PropTypes.number,
  resource: PropTypes.object,
  toggleSwitch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSwitch: (objectID, instanceID, resourceID, value) => dispatch(action.sendRequest(objectID, instanceID, resourceID, !value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SwitchResource);
