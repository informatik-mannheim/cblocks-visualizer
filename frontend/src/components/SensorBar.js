import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './sensorBar.scss';

class SensorBar extends Component {

  getPercentage = (min, max, val) => {
    const range = max - min;
    return val / range * 100;
  }

  getMarginLeftPercentage = (greaterEqualsThan, lessThan) => {
    return '33%';
  }

  getWidthPercentage = (greaterEqualsThan, lessThan) => {
    return '33%';
  }

  handleChange = () => {
    return;
  }

  render () {

    const percentage = this.getPercentage(this.props.min, this.props.max, this.props.currentValue);

    let i = 0;
    const component = (
      <div className='sensorBar-container rkmd-slider slider-discrete slider-lightBlue slider-light'>
        <div className='sensorBar-main-bar' style={{background: '#8d2d56', width: '100%', height: 5, zIndex: 2}}>
          {Object.entries(this.props.ranges).map((rangesKeyValue) => {
            const currentRange = rangesKeyValue[1];
            return (
              <div
                key={'range-' + i++}
                style={{background: '#ffde03',
                  width: this.getWidthPercentage(currentRange.greaterEqualsThan, currentRange.lessThan),
                  marginLeft: this.getMarginLeftPercentage(currentRange.greaterEqualsThan, currentRange.lessThan),
                  height: 5,
                  zIndex: i
                }}/>
            );
          })}
        </div>
        <div style={{
          width: 20,
          height: 20,
          backgroundColor: 'red',
          borderRadius: '15px 15px 15px 0',
          marginLeft: percentage + '%',
          transform: 'rotate(-45deg) translate(23px, -25px)'}}>
            {/*
              LABEL FOR HANDLE
              <span style={{
              position: 'absolute',
              top: 3,
              width: '100%',
              color: '#fff',
              fontSize: 12,
              fontWeight: 'bold',
              textAlign: 'center',
              transform: 'rotate(45deg)',
              opacity: 1,
              userSelect: 'none'}}>
              {this.props.currentValue}
            </span> */}
        </div>
      </div>
    );

    return component;
  }
}

SensorBar.propTypes = {
    currentValue: PropTypes.number,
    defaultValue: PropTypes.string,
    max: PropTypes.number,
    min: PropTypes.number,
    ranges: PropTypes.array
};

SensorBar.defaultProps = {
    ranges: []
};

export default SensorBar;
