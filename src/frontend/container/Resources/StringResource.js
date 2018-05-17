import React from 'react';
import PropTypes from 'prop-types';
import * as action from '../../action/';
import { connect } from 'react-redux';

class StringResource extends React.Component {

  handleChange = (field, value) => {
    if (this.props.isWriteable === true) {
      this.props.toggleSwitch(this.props.objectID, this.props.instanceID, this.props.resource.resourceID, value);
    }
  };

  render () {
    return (
      <div>
        <div style={{textAlign: 'center'}}>{this.props.resource.name}</div>
        <div style={{textAlign: 'center', fontSize: 25, marginTop: 4, marginBottom: 4}}>{this.props.currentValue}</div>
      </div>
    );
  }
}

StringResource.propTypes = {
  currentValue: PropTypes.any,
  instanceID: PropTypes.number,
  isWriteable: PropTypes.bool,
  objectID: PropTypes.number,
  resource: PropTypes.object,
  toggleSwitch: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  toggleSwitch: (objectID, instanceID, resourceID, value) => dispatch(action.sendRequest(objectID, instanceID, resourceID, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(StringResource);
