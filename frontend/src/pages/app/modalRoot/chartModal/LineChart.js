import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
};

class LineChart extends Component {
  render () {
    return (
      <div>LIKAJHSDLKJHASF</div>
    );
  }
}

LineChart.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool
};

export default withStyles(styles)(LineChart);
