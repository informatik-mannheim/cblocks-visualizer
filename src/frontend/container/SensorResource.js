import React from 'react';
import PropTypes from 'prop-types';
import StatusBar from '../component/StatusBar';

class SensorResource extends React.Component {
  render () {
    const percentage = Math.round(this.props.currentValue
      / (this.props.resource.schema.maximum - this.props.resource.schema.minimum) * 100);
    return (
      <div>
          <div style={{textAlign: 'center'}}>{this.props.resource.name}</div>
          <div>
            <StatusBar percentage={percentage}/>
            <div style={{textAlign: 'left', fontSize: 12, marginLeft: 8, display: 'block', float: 'left'}}>{this.props.resource.schema.minimum}</div>
            <div style={{textAlign: 'right', fontSize: 12, marginRight: 8, display: 'block', float: 'right'}}>{this.props.resource.schema.maximum}</div>
          </div>
          <div style={{textAlign: 'center', fontSize: 25}}>{this.props.currentValue
            + ' ' + this.props.resource.schema.unit}</div>
      </div>
    );
  }
}

SensorResource.propTypes = {
  currentValue: PropTypes.number,
  resource: PropTypes.object
};

export default SensorResource;
