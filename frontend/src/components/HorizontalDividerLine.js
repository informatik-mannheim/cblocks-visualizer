import React from 'react';
import PropTypes from 'prop-types';

const getGray = (isMappingDivider) => {
  if (isMappingDivider === false) {
    return '#808080';
  } else {
    return '#E8E8E8';
  }
};

export class HorizontalDividerLine extends React.Component {

  render () {
    const style = {
      border: 0,
      height: '1px',
      backgroundImage: '-webkit-linear-gradient(left, #f0f0f0, ' + getGray(this.props.isMappingDivider) + ', #f0f0f0)',
      width: '100%'
    };

    return (
      <div>
        <hr style={style}/>
      </div>
    );
  }
}

HorizontalDividerLine.propTypes = {
  isMappingDivider: PropTypes.bool
};

HorizontalDividerLine.defaultProps = {
  isMappingDivider: false
};
