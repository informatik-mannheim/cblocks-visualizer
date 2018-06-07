import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Card, CardHeader, withStyles } from '@material-ui/core';

const styles = {
  card: {
    width: 350
  },
  cardHeader: {
    title: {
      variant: 'display4'
    }
  }
};

class SensorDragPreview extends Component {
  render () {
    return (
        <Card className={this.props.classes.card}>
          <CardHeader
            className={this.props.classes.cardHeader}
            avatar={
              <Avatar>
                R
              </Avatar>
            }
            title={this.props.name}/>
        </Card>
    );
  }
}

SensorDragPreview.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired
};
export default withStyles(styles)(SensorDragPreview);
