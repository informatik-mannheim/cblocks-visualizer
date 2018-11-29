import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

class FormRangeComponent extends Component {
  state = {
    label: '',
    greaterEqualsThan: '',
    lessThan: ''
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
    this.props.onChange('test');
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
  onChange: PropTypes.func
};

export default FormRangeComponent;
