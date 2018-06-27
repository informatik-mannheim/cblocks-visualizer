import React from 'react';
import PropTypes from 'prop-types';
import Nouislider from 'react-nouislider';
import './nouislider.scss';
import Typography from '@material-ui/core/Typography';

class MaterialSlider0 extends React.Component {
  static propTypes = {
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
  }

  constructor () {
    super();
    this.isBeingDragged = false;
  }

  handleDragStart = () => {
    this.isBeingDragged = true;
  };

  handleDragEnd = () => {
    this.isBeingDragged = false;
  };

  handleOnChange = () => {
    this.isBeingDragged = false;
    if (this.refs.NouisliderRef !== undefined) {
      if (this.props.isWriteable === true) {
        this.props.requestChangeToSubresource(this.props.label, Number.parseInt(this.refs.NouisliderRef.slider.get()));
      } else {
        this.refs.NouisliderRef.slider.set(this.props.currentValue);
      }
    }
  };

  render () {
    const slider = (
      <Nouislider
        start={[this.props.currentValue]}
        connect={[true, false]}
        step={1}
        range={{ min: this.props.minimum, max: this.props.maximum }}
        onChange={() => this.handleOnChange()}
        onStart={() => this.handleDragStart()}
        onEnd={() => this.handleDragEnd()}
        ref={'NouisliderRef'}
      />
    );

    return (
      <div>
        <Typography id="label">{this.props.label !== undefined ? this.props.label.charAt(0).toUpperCase() + this.props.label.slice(1) : ''}</Typography>
        {slider}
      </div>
    );
  }
}

export default MaterialSlider0;
