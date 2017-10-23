import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle } from 'react-toolbox/lib/card';

const styles = {
  display: 'inline-block',
  transform: 'rotate(-45deg)',
  WebkitTransform: 'rotate(-45deg)',
  width: 100,
  height: 100,
  border: '1px solid black',
  borderRadius: 5
};

class NodeDragPreview extends Component {

  render () {
    const { label } = this.props;
    return (
      <Card style={{width: '350px'}}>
        <CardTitle
          title={this.props.label}
        />
      </Card>
    );
  }
}

NodeDragPreview.propTypes = {
  label: PropTypes.string.isRequired
};
export default NodeDragPreview;
