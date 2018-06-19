import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Card, CardHeader, withStyles, SvgIcon } from '@material-ui/core';
import svgIcons from '../../../images/svgIcons';

const styles = {
  card: {
    width: 350
  },
  cardHeader: {
    title: {
      variant: 'display4'
    }
  },
  sensorAvatar: {
    color: 'primary',
    backgroundColor: '#fff'
  }
};

class SensorDragPreview extends Component {
  render () {

    let path;
    switch (this.props.objectID) {
      case 3303:
        path = svgIcons.room;
        break;
      case 3304:
        path = svgIcons.led;
        break;
      case 3305:
        path = svgIcons.rfid;
        break;
      default:
        path = svgIcons.default;
    }

    const sensorIcon = (
      <SvgIcon color='primary'>
        <path d={path} />
      </SvgIcon>
    );

    return (
        <Card className={this.props.classes.card}>
          <CardHeader
            className={this.props.classes.cardHeader}
            avatar={
              <Avatar className={this.props.classes.sensorAvatar}>
                {sensorIcon}
              </Avatar>
            }
            title={this.props.name}/>
        </Card>
    );
  }
}

SensorDragPreview.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  objectID: PropTypes.number.isRequired
};
export default withStyles(styles)(SensorDragPreview);
