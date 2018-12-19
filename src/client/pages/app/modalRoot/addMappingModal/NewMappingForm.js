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
  CATEGORY: 'category',
  LABEL: 'label',
  RANGE: 'range'
};

class NewMappingForm extends Component {
  state = {
    mappingType: mappingTypes.RANGE,
    mappingName: '',
    defaultValue: '',
    ranges: [{ index: 0, label: '', greaterEqualsThan: '', lessThan: '' }],
    greaterEqualsThan: '',
    lessThan: ''
  };

  componentDidMount = () => {
    this.setState({
      objectID: this.props.objectID,
      instanceID: this.props.instanceID,
      resourceID: this.props.resourceID
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState !== this.state) {
      console.log(this.state);
    }
  };

  handleChange = e => {
    if (e.target.name === 'mappingTypeSelect') {
      this.setState({ mappingType: e.target.value });
    }
    if (e.target.name === 'mappingNameField') {
      this.setState({ mappingName: e.target.value });
    }
    if (e.target.name === 'defaultValueField') {
      this.setState({ defaultValue: e.target.value });
    }
  };

  handleRangeChange = (index, rangeState) => {
    if (this.state.mappingType === mappingTypes.CATEGORY) {
      const newRanges = this.state.ranges;
      newRanges[index] = { ...rangeState, index };
      this.setState({ ranges: newRanges });
    } else {
      this.setState({
        greaterEqualsThan: rangeState.greaterEqualsThan,
        lessThan: rangeState.lessThan
      });
    }
  };

  handleClick = () => {
    const ranges = this.state.ranges.map(r => ({
      label: r.label,
      greaterEqualsThan: r.greaterEqualsThan,
      lessThan: r.lessThan
    }));

    const stateObjectForMappingAction = {
      mappingType: this.state.mappingType,
      label: this.state.mappingName,
      defaultValue: this.state.defaultValue,
      resource: {
        objectID: this.props.objectID,
        instanceID: this.props.instanceID,
        resourceID: this.props.resourceID
      },
      greaterEqualsThan: this.state.greaterEqualsThan,
      lessEqualsThan: this.state.lessThan,
      ranges
    };

    this.props.createNewMapping(stateObjectForMappingAction);
  };

  addRange = () => {
    const newRanges = this.state.ranges;
    newRanges[newRanges.length] = {
      index: newRanges.length,
      label: '',
      greaterEqualsThan: '',
      lessThan: ''
    };
    this.setState({ ranges: newRanges });
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
            onChange={this.handleChange.bind(this)}
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

          {this.state.mappingType === mappingTypes.CATEGORY && (
            <TextField
              style={{ float: 'right' }}
              label="Default Value"
              onChange={this.handleChange}
              inputProps={{
                name: 'defaultValueField'
              }}
            />
          )}
        </div>
        {this.state.mappingType === mappingTypes.RANGE && (
          <FormRangeComponent
            isRange
            index={1}
            onChange={this.handleRangeChange}
          />
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
                key={r.index}
                index={r.index}
                onChange={this.handleRangeChange}
              />
            );
          })}
        {this.state.mappingType === mappingTypes.CATEGORY && (
          <Button
            variant="fab"
            mini
            color="secondary"
            style={{
              marginLeft: '45%',
              marginTop: 20
            }}
            onClick={this.addRange.bind(this)}
          >
            <AddIcon />
          </Button>
        )}

        <Button
          style={{ float: 'right', marginTop: 70 }}
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
  createNewMapping: PropTypes.func,
  hideModal: PropTypes.func,
  instanceID: PropTypes.number,
  objectID: PropTypes.number,
  open: PropTypes.bool,
  resourceID: PropTypes.number
};

export default NewMappingForm;
