import React from 'react';
import PropTypes from 'prop-types';
import {Switch} from 'react-toolbox/lib';

class SwitchResource extends React.Component {
  render () {
    const valueBool = this.props.currentValue === 1 ? true : false;
    return (
      <div>
        <div style={{textAlign: 'center'}}>{this.props.resource.name}</div>
        <Switch
          checked={valueBool}
          label={this.props.resource.name}
        />
      </div>
    );
  }
}

SwitchResource.propTypes = {
  currentValue: PropTypes.any,
  resource: PropTypes.object
};

export default SwitchResource;
