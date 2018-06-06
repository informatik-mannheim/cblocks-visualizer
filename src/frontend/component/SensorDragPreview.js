import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@material-ui/core';

class SensorDragPreview extends Component {

  render () {
    return (
        <Card style={{width: 350}}>
          <CardContent>
            <Typography variant="headline" component="h2" align="center" >
              {this.props.name}
            </Typography>
          </CardContent>
        </Card>
    );
  }
}

SensorDragPreview.propTypes = {
  name: PropTypes.string.isRequired
};
export default SensorDragPreview;
