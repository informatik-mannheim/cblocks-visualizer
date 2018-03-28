import React from 'react';
import PropTypes from 'prop-types';

class StatusBar extends React.Component {

  static propTypes = {
    animation: PropTypes.number,
    color: PropTypes.string,
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    percentage: ((props, propName) => {
      if (typeof props[propName] !== 'number') {
        return Progress.throwError('Invalid Props: "percentage" should ∈ ℝ ');
      }
      if (props[propName] < 0 || props[propName] > 100) {
        return Progress.throwError('Invalid Props: "percentage" should be between 0 and 100');
      }
    })
  }

  static defaultProps = {
    percentage: 0,
    color: '#4CAF50',
    animation: 200,
    height: 30
  }

  static throwError () {
    return new Error(...arguments);
  }

  render () {
    const {color, percentage, animation, height, className, children, ...rest} = this.props;
    const style = {
      backgroundColor: color,
      width: '100%',
      marginBottom: '5px',
      marginLeft: '10px',
      marginRight: '10px',
      marginTop: '5px',
      height: height
    };

    return (
      <div style={{display: 'flex', justifyContent: 'center'}} className={className || 'sensor-statusbar-container'} {...rest}>
        <div className="sensor-statusbar" style={style}>{children}
          <div style={{borderRight: 'thick solid #000000', height: '100%', width: percentage + '%', transition: `width ${animation}ms`}}/>
        </div>
      </div>
    );
  }
}

export default StatusBar;
