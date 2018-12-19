import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ReactTooltip from 'react-tooltip';

class SensorBar extends Component {
  state = {
    hovering: false,
    rangeLabel: ''
  };

  handleHoverStart = rangeLabel => {
    this.setState(() => ({ hovering: true, rangeLabel }));
  };

  handleHoverEnd = () => {
    this.setState(() => ({ hovering: false, rangeLabel: '' }));
  };

  getPercentage = (min, max, val) => {
    const range = max - min;
    if (min >= 0) {
      return (val / range) * 100;
    }

    //min negative
    const minToZero = min * -1;
    return ((minToZero + val) / range) * 100;
  };

  getWidthPercentage = (min, max, greaterEqualsThan, lessThan) => {
    const high = this.getPercentage(min, max, lessThan);
    const low = this.getPercentage(min, max, greaterEqualsThan);
    return high - low;
  };

  getHandleColor = () => {
    const activeMapping = this.activeMapping();
    if (activeMapping !== undefined) {
      for (const range of activeMapping.ranges) {
        if (
          this.props.currentValue >= range.low
          && this.props.currentValue < range.high
        ) {
          return range.color;
        }
      }
    }
    return '#8D2D55';
  };

  activeMapping = () => {
    for (const mapping of this.props.mappings) {
      if (mapping.active === true) return mapping;
    }
  };

  render = () => {
    const percentage = this.getPercentage(
      this.props.min,
      this.props.max,
      this.props.currentValue
    );

    let i = 0;
    const component = (
      <div>
        <div
          style={{
            background: '#8d2d55',
            width: '100%',
            height: 5,
            zIndex: 0,
            position: 'relative'
          }}
        >
          {this.activeMapping() === undefined
            ? null
            : Object.entries(this.activeMapping().ranges).map(
                rangesKeyValue => {
                  const currentRange = rangesKeyValue[1];
                  return (
                    <div
                      data-tip={currentRange.label}
                      key={'range-' + i++}
                      onMouseEnter={() => {
                        this.handleHoverStart(currentRange.label);
                      }}
                      onMouseLeave={() => {
                        this.handleHoverEnd();
                      }}
                      style={{
                        background: currentRange.color,
                        width:
                          this.getWidthPercentage(
                            this.props.min,
                            this.props.max,
                            currentRange.low,
                            currentRange.high
                          ) + '%',
                        marginLeft:
                          this.getPercentage(
                            this.props.min,
                            this.props.max,
                            currentRange.low
                          ) + '%',
                        height: 5,
                        top:
                          this.state.rangeLabel === currentRange.label ? -1 : 0,
                        position: 'absolute',
                        border:
                          this.state.rangeLabel === currentRange.label
                            ? '1px solid black'
                            : ''
                      }}
                    />
                  );
                }
              )}
        </div>
        <div
          style={{
            width: 16,
            height: 16,
            backgroundColor: this.getHandleColor(percentage),
            borderRadius: '20px 20px 20px 0',
            marginLeft: percentage + '%',
            transform: 'rotate(-45deg) translate(14px, -26px)'
          }}
        />
        <ReactTooltip />
      </div>
    );

    return component;
  };
}

SensorBar.propTypes = {
  currentValue: PropTypes.number,
  defaultValue: PropTypes.string,
  mappings: PropTypes.array,
  max: PropTypes.number,
  min: PropTypes.number
};

SensorBar.defaultProps = {
  min: 0,
  max: 100
};

export default SensorBar;
