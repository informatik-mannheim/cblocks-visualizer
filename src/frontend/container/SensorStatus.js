import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import StatusBar from '../component/StatusBar';

class SensorStatus extends React.Component {
  render () {
    const percentage = Math.round(this.props.currentValue / this.props.maxValue * 100);
    console.log(this.props);
    console.log(percentage);
    return (
      <div>
        <div style={{textAlign:'center', fontSize:25}}>{this.props.currentValue}</div>
          <StatusBar percentage={percentage}/>
        </div>
    );
  }
}

SensorStatus.propTypes = {
  currentValue: PropTypes.number,
  label: PropTypes.string,
  maxValue: PropTypes.number,
  minValue: PropTypes.number
};

SensorStatus.defaultProps = {
  currentValue: 512,
  label: 'test',
  maxValue: 1024,
  minValue: 0
};

export default SensorStatus;
