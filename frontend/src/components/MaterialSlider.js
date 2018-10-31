import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    width: 300
  },
  slider: {
    padding: '22px 0px'
  }
};

class MaterialSlider extends React.Component {


  constructor () {
    super();
    this.isBeingDragged = false;
  }

  state = {
    value: 50
  }

  componentDidMount () {
    this.value = this.props.currentValue;
  }

  handleDragStart = () => {
    this.isBeingDragged = true;
  };

  handleDragEnd = (event) => {
    this.props.requestChangeToSubresource(this.props.label, Number.parseInt(this.state.value));
    setTimeout(() => {
      this.isBeingDragged = false;
    }, 1000);
  };

  handleOnChange = (event, value) => {
      if (this.isBeingDragged === true) {
          this.setState({value: value});
      } else {
        this.props.requestChangeToSubresource(this.props.label, Number.parseInt(value));
      }
  }

  render () {
    const { classes } = this.props;
    const sliderValue = (this.isBeingDragged === false) ? this.props.currentValue : this.state.value;

    const slider = (
      <div className={classes.root}>
        <Slider
          value={sliderValue}
          onChange={(event, value) => this.handleOnChange(event, value)}
          onDragStart={() => this.handleDragStart()}
          onDragEnd={() => this.handleDragEnd()}
          min={this.props.minimum}
          max={this.props.maximum}
        />
      </div>
    );
//<Typography id="label">{this.props.label !== undefined ? this.props.label.charAt(0).toUpperCase() + this.props.label.slice(1) : ''}</Typography>
    return (
      <div>
        {slider}
      </div>
    );
  }
}

MaterialSlider.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.string,
  currentValue: PropTypes.number,
  instanceID: PropTypes.number,
  isWriteable: PropTypes.bool,
  label: PropTypes.string,
  maximum: PropTypes.number,
  minimum: PropTypes.number,
  objectID: PropTypes.number,
  requestChangeToSubresource: PropTypes.func,
  resourceID: PropTypes.number
};

export default withStyles(styles)(MaterialSlider);
