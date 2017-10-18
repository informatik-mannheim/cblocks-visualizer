import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from './Box';

const styles = {
  display: 'inline-block',
  transform: 'rotate(-7deg)',
  WebkitTransform: 'rotate(-7deg)',
  width: 100,
  height: 100,
  border: '1px solid black',
  borderRadius: 5,
};

class BoxDragPreview extends Component {

  render() {
    const { label } = this.props;
    return (

      <div style={styles}>
        {this.props.label}
      </div>
    );
  }
}

BoxDragPreview.propTypes = {
  label: PropTypes.string.isRequired,
};
export default BoxDragPreview;
