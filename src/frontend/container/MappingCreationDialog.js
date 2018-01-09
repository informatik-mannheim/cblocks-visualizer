import Dialog from 'react-toolbox/lib/dialog';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as action from '../action/';
import Dropdown from 'react-toolbox/lib/dropdown';
import Input from 'react-toolbox/lib/input';

class MappingCreationDialog extends Component {

  constructor (props) {
    super(props);
    this.state = {
      active: true,
      name: '',
      nodeId: '',
      sensorId: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
    console.log(this.state);
  };
  //TODO: implement save
  actions = [
    { label: 'Cancel', onClick: this.props.cancel },
    { label: 'Save', onClick: this.props.cancel }
  ];

  render () {
    const nodeDropdownSource = [], sensorDropdownSource = [];
      this.props.nodes.forEach((node) => {
        if (typeof node !== 'undefined') {
          nodeDropdownSource.push({value: node._id, label: node.label});
        }
      });
      this.props.sensors.forEach((sensor) => {
        if (typeof sensor !== 'undefined') {
          sensorDropdownSource.push({value: sensor._id, label: sensor.label});
        }
      });
    return (
      <div>
        <Dialog
          actions={this.actions}
          active={this.props.active}
          //onEscKeyDown={this.props.cancel()}
          //onOverlayClick={}
          title={'Mapping'}
        >
          <Input type='text' ref='nameInput' label='Name' name='name' value={this.state.name} onChange={this.handleChange.bind(this, 'name')}/>
          <div>Node: <Dropdown ref='nodeDropdown' source={nodeDropdownSource} value={this.state.nodeId} onChange={this.handleChange.bind(this, 'nodeId')}/></div>
          <div>Sensor: <Dropdown ref='sensorDropdown' source={sensorDropdownSource} value={this.state.sensorId} onChange={this.handleChange.bind(this, 'sensorId')}/></div>
        </Dialog>
      </div>
    );
  }
}

MappingCreationDialog.propTypes = {
  active: PropTypes.bool.isRequired,
  cancel: PropTypes.func.isRequired,
  dialogState: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  nodes: PropTypes.array.isRequired,
  save: PropTypes.func.isRequired,
  sensors: PropTypes.array.isRequired,
  updateDialog: PropTypes.func.isRequired
};

MappingCreationDialog.defaultProps = {
  label: 'New Mapping',
  active: false
};

const mapStateToProps = (state) => {
  return {
    active: state.mappingDialog.active,
    dialogState: state.mappingDialog,
    nodes: state.nodes.all_nodes,
    sensors: state.sensors.all_sensors
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cancel: () => dispatch(action.closeMappingDialog()),
    save: () => dispatch(action.closeMappingDialog()),
    updateDialog: (mcd) => {
      const newState = Object.assign({}, mcd.props.dialogState, {nodeId: mcd.refs.nodeDropdown.props.value, sensorId: mcd.refs.sensorDropdown.props.value});
      console.log(newState);
      dispatch(action.updateMappingDialog(newState));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MappingCreationDialog);
