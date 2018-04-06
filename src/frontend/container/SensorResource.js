import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import StatusBar from '../component/StatusBar';

class SensorResource extends React.Component {
  render () {
    const percentage = Math.round(this.props.resource.value / this.props.maxValue * 100);
    return (
      <div>
          <div style={{textAlign: 'center'}}>{this.props.resource.name}</div>
          <StatusBar percentage={percentage}/>
          <div style={{textAlign: 'center', fontSize: 25}}>{this.props.currentValue}</div>
      </div>
    );
  }
}

SensorResource.propTypes = {
  currentValue: PropTypes.number,
  maxValue: PropTypes.number,
  minValue: PropTypes.number,
  resource: PropTypes.object
};

SensorResource.defaultProps = {
  maxValue: 100,
  minValue: 0
};

export default SensorResource;
