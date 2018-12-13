import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

class FormRangeComponent extends Component {
  state = {
    label: '',
    greaterEqualsThan: 0,
    lessThan: 0
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState !== this.state) {
      this.props.onChange(this.props.index, this.state);
    }
  };

  handleChange = name => event => {
    const value
      = event.target.type === 'number'
        ? parseInt(event.target.value)
        : event.target.value;
    this.setState({
      [name]: value
    });
  };

  render = () => {
    return (
      <div position="relative">
        <TextField
          style={{ width: 50 }}
          id="greaterEqualsThan"
          label="Low"
          value={this.state.greaterEqualsThan}
          onChange={this.handleChange('greaterEqualsThan')}
          type="number"
          margin="dense"
        />

        <Typography
          variant="body2"
          style={{
            display: 'inline-block',
            marginLeft: 15,
            marginRight: 15
          }}
        >
          {'≤'}
        </Typography>

        <TextField
          id="label"
          label="Range Label"
          value={this.state.label}
          onChange={this.handleChange('label')}
          type="text"
        />

        <Typography
          variant="body1"
          style={{
            display: 'inline-block',
            marginLeft: 15,
            marginRight: 15
          }}
        >
          {'<'}
        </Typography>

        <TextField
          style={{
            width: 50
          }}
          id="lessThan"
          label="High"
          value={this.state.lessThan}
          onChange={this.handleChange('lessThan')}
          type="number"
          margin="dense"
        />
      </div>
    );
  };
}

FormRangeComponent.propTypes = {
  index: PropTypes.number,
  onChange: PropTypes.func
};

export default FormRangeComponent;
