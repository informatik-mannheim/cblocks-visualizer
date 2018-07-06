import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Card, CardHeader, withStyles, SvgIcon } from '@material-ui/core';
import svgIcons from '../../../images/svgIcons';

const styles = {
  card: {
    width: 90
  },
  cardHeader: {
    background: '#DD302A',
    title: {
      variant: 'display4'
    }
  },
  sensorAvatar: {
    color: 'primary',
    backgroundColor: '#fff'
  }
};

class ChartDragPreview extends Component {
  render () {

    return (
        <Card className={this.props.classes.card}>
          <CardHeader
            className={this.props.classes.cardHeader}
            avatar={
              <Avatar className={this.props.classes.sensorAvatar}>
                <SvgIcon color='primary'>
                  <path d={svgIcons.chart} />
                </SvgIcon>
              </Avatar>
            }/>
        </Card>
    );
  }
}

ChartDragPreview.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(ChartDragPreview);
