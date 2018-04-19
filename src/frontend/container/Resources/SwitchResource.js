import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-toolbox/lib';

class SwitchResource extends React.Component {

  handleChange = (field, value) => {
    console.log(field + ', ' + value);
  };

  render () {
    return (
      <div>
        <div style={{textAlign: 'center'}}>{this.props.resource.name}</div>
          <Switch
            style={{zIndex: 100}}
            checked={this.props.currentValue}
            label={this.props.resource.name}
            onChange={this.handleChange.bind(this, 'switch')}
          />
          <Switch
            style={{zIndex: -100}}
            checked={this.props.currentValue}
            label={this.props.resource.name}
            disabled={true}
            onChange={this.handleChange.bind(this, 'switch')}
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
