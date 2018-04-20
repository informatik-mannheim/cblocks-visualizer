import React from 'react';
import PropTypes from 'prop-types';
import * as action from '../../action/';
import { Switch } from 'react-toolbox/lib';
import { connect } from 'react-redux';

class SwitchResource extends React.Component {

  handleChange = (field, value) => {
    if (this.props.isWriteable === true) {
      this.props.toggleSwitch(this.props.objectID, this.props.instanceID, this.props.resource.resourceID, value);
    }
  };

  render () {
    console.log(this.props.resource);
    return (
      <div>
        <div style={{textAlign: 'center'}}>{this.props.resource.name}</div>
          <Switch
            style={{zIndex: 100}}
            checked={this.props.currentValue}
            label={this.props.resource.name}
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
    toggleSwitch: (objectID, instanceID, resourceID, value) => dispatch(action.sendRequest(objectID, instanceID, resourceID, value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SwitchResource);
