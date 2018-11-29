import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormRangeComponent from './newMappingForm/FormRangeComponent';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';

const handleSubmit = event => {
  //Make a network call somewhere
  console.log(event);
  event.preventDefault();
};

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
});

const mappingTypes = {
  CATEGORY: 'CATEGORY',
  LABEL: 'LABEL',
  RANGE: 'RANGE'
};

class NewMappingForm extends Component {
  state = {
    mappingType: mappingTypes.RANGE,
    rangeCount: 1,
    mappingName: '',
    defaultValue: '',
    ranges: [{ id: 1 }, { id: 2 }]
  };

  handleClick = () => {
    console.log('test');
  };

  handleChange = e => {
    if (e.target.name === 'mappingTypeSelect') {
      this.setState({ mappingType: e.target.value });
      if (e.target.value === mappingTypes.RANGE) {
        this.setState({ rangeCount: 1 });
      }
    }
    if (e.target.name === 'mappingNameField') {
      this.setState({ mappingName: e.target.value });
    }
    if (e.target.name === 'defaultValueField') {
      this.setState({ defaultValue: e.target.value });
    }
  };

  handleRangeChange = e => {
    console.log(e);
  };

  render () {
    return (
      <div>
        <div>
          <Typography
            variant="body1"
            align="center"
            style={{
              marginTop: 15
            }}
          >
            TYPE
          </Typography>
          <Select
            value={this.state.mappingType}
            onChange={this.handleChange}
            inputProps={{
              name: 'mappingTypeSelect'
            }}
          >
            <MenuItem value={mappingTypes.RANGE}>Range Mapping</MenuItem>
            <MenuItem value={mappingTypes.CATEGORY}>Category Mapping</MenuItem>
            <MenuItem value={mappingTypes.LABEL}>Label Mapping</MenuItem>
          </Select>
          <br />
          <Typography
            variant="body1"
            align="center"
            style={{ marginTop: 20, marginBottom: -14 }}
          >
            INFO
          </Typography>
          <TextField
            label="Mapping Name"
            onChange={this.handleChange}
            inputProps={{
              name: 'mappingNameField'
            }}
          />
          <TextField
            style={{ float: 'right' }}
            label="Default Value"
            onChange={this.handleChange}
            inputProps={{
              name: 'defaultValueField'
            }}
          />
        </div>
        {this.state.mappingType === mappingTypes.RANGE && (
          <FormRangeComponent id={1} onChange={this.handleRangeChange} />
        )}

        {this.state.mappingType === mappingTypes.CATEGORY && (
          <div style={{ marginTop: 20, marginBottom: -18 }}>
            <Typography variant="body1" align="center">
              RANGES
            </Typography>
          </div>
        )}
        {this.state.mappingType === mappingTypes.CATEGORY
          && this.state.ranges.map(r => {
            return (
              <FormRangeComponent
                key={r.id}
                id={r.id}
                onChange={this.handleRangeChange}
              />
            );
          })}
        {this.state.mappingType === mappingTypes.CATEGORY && (
          <Button
            variant="fab"
            mini
            color="primary"
            style={{
              float: 'center'
            }}
          >
            <AddIcon />
          </Button>
        )}

        {/*<Button
        variant='fab'
        mini
        color='primary'
        style={{
          alignSelf: 'flex-end'
        }}
        >
          <AddIcon/>
        </Button>*/}

        <Button
          style={{ float: 'right', marginTop: 50 }}
          onClick={this.handleClick}
          color="secondary"
        >
          CREATE MAPPING
        </Button>
      </div>
    );
  }
}

NewMappingForm.propTypes = {
  classes: PropTypes.object,
  hideModal: PropTypes.func,
  instanceID: PropTypes.number,
  objectID: PropTypes.number,
  open: PropTypes.bool,
  resourceID: PropTypes.number
};

export default NewMappingForm;
