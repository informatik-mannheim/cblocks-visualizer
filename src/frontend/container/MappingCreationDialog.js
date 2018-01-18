import Dialog from 'react-toolbox/lib/dialog';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as action from '../action/';
import Dropdown from 'react-toolbox/lib/dropdown';
import Input from 'react-toolbox/lib/input';
import Constants from '../constants';

class MappingCreationDialog extends Component {

  constructor (props) {
    super(props);
    this.state = props.dialogState;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (name, value) => {
    this.props.updateDialog(this);
  };

  handleChangeSensorDropdown = (value) => {
    this.props.updateDialog(this, {sensorId: value});
  };

  handleChangeName = (value) => {
    this.props.updateDialog(this, {name: value});
  };

  handleChangeMappingTypeDropdown = (value) => {
    this.props.updateDialog(this, {mappingType: value});
  }

  getNodeName = () => {
    this.props.nodes.map((node) => {
      if (node._id === this.props.dialogState.nodeId) {
        return node._id;
      }
    });
  }

  getMappingTypeDropdownSource = () => {
    const arr = [];
    Object.entries(Constants.MappingTypes).forEach((entry) => {
      const [key, value] = entry;
      const obj = {};
      obj.value = key;
      obj.label = value;
      arr.push(obj);
    });
    return arr;
  }

  getNodeDropdownSource = (props) => {
    const nodeDropdownSource = [];
    props.nodes.forEach((node) => {
      if (typeof node !== 'undefined') {
        nodeDropdownSource.push({value: node._id, label: node.label});
      }
    });
    return nodeDropdownSource;
  }

  getSensorDropdownSource = (props) => {
    const sensorDropdownSource = [];
    props.sensors.forEach((sensor) => {
      if (typeof sensor !== 'undefined') {
        props.nodes.map((node) => {
          if (node._id === props.dialogState.nodeId) {
            if (node.sensors.includes(sensor._id)) {
              sensorDropdownSource.push({value: sensor._id, label: sensor.label});
            }
          }
        });
      }
    });
    return sensorDropdownSource;
  }

  getInitialLabel = (dialog) => {
    let mappingName = '';
    if (dialog.props.dialogState.name === '') {
      mappingName = 'New Mapping';
      this.handleChangeName(mappingName);
    } else {
      mappingName = dialog.props.dialogState.name;
    }
  }

  componentDidMount () {
    console.log(this);
    this.getInitialLabel(this);
  }


  //TODO: implement save
  actions = [
    { label: 'Cancel', onClick: this.props.cancel },
    { label: 'Save', onClick: this.props.cancel }
  ];

  render () {
    return (
      <div>
        <Dialog
          actions={this.actions}
          active={this.props.active}
          //onEscKeyDown={this.props.cancel()}
          //onOverlayClick={}
          title={'Mapping'}
        >
          <Input type='text' ref='nameInput' label='Name' name='name' value={this.props.label} onChange={this.handleChangeName}/>
          <div>Node: <Dropdown ref='nodeDropdown' disabled={true} source={this.getNodeDropdownSource(this.props)} value={this.props.nodeId} onChange={this.handleChange.bind(this, 'nodeId')}/></div>
          <div>Sensor: <Dropdown ref='sensorDropdown' source={this.getSensorDropdownSource(this.props)} value={this.props.sensorId} onChange={this.handleChangeSensorDropdown}/></div>
          <div>Mapping Type: <Dropdown ref='typeDropdown' source={this.getMappingTypeDropdownSource()} value={this.props.mappingType} onChange={this.handleChangeMappingTypeDropdown}/></div>
        </Dialog>
      </div>
    );
  }
}

MappingCreationDialog.propTypes = {
  active: PropTypes.bool.isRequired,
  cancel: PropTypes.func.isRequired,
  clearDialog: PropTypes.func.isRequired,
  dialogState: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  mappingType: PropTypes.string,
  nodeId: PropTypes.string.isRequired,
  nodes: PropTypes.array.isRequired,
  save: PropTypes.func.isRequired,
  sensorId: PropTypes.string.isRequired,
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
    nodeId: state.mappingDialog.nodeId,
    sensorId: state.mappingDialog.sensorId,
    mappingType: state.mappingDialog.mappingType,
    label: state.mappingDialog.name,
    nodes: state.nodes.all_nodes,
    sensors: state.sensors.all_sensors
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cancel: () => dispatch(action.closeMappingDialog()),
    save: () => dispatch(action.clearMappingDialog()),
    clearDialog: () => dispatch(action.clearMappingDialog()),
    updateDialog: (mcd, changes) => {
      const newState = Object.assign({}, mcd.props.dialogState, changes);
      console.log(newState);
      dispatch(action.updateMappingDialog(newState));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MappingCreationDialog);
