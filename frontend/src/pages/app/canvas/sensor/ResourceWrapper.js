import React from 'react';
import PropTypes from 'prop-types';
import NumberResource from './resourceWrapper/NumberResource';
import SwitchResource from './resourceWrapper/SwitchResource';
import StringResource from './resourceWrapper/StringResource';
import MultiResource from './resourceWrapper/MultiResource';
import * as action from '../../../../action/';
import { connect } from 'react-redux';

class ResourceWrapper extends React.Component {
  render () {
    let Component;
    if (this.props.multiResource === false) {
      //Single value resource
      const type = this.props.resource.schema === undefined ? this.props.resource.type : this.props.resource.schema.type;

      switch (type) {
        case 'boolean':
          Component = SwitchResource;
          break;
        case 'number':
          Component = NumberResource;
          break;
        case 'string':
          Component = StringResource;
          break;
        default:
      }
    } else {
      Component = MultiResource;
    }

    return (
      <div>
        <Component {...this.props}/>
      </div>
    );
  }
}

ResourceWrapper.propTypes = {
  buildRequest: PropTypes.func,
  currentValue: PropTypes.any,
  instanceID: PropTypes.number,
  isWriteable: PropTypes.bool,
  mappings: PropTypes.array,
  multiResource: PropTypes.bool,
  objectID: PropTypes.number,
  resource: PropTypes.object,
  smallForm: PropTypes.bool
};

ResourceWrapper.defaultProps = {
  multiResource: false,
  smallForm: false,
  mappings: []
};

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    buildRequest: (objectID, instanceID, resourceID, value) => dispatch(action.buildRequest(objectID, instanceID, resourceID, value)),
    showModal: (modalType, modalProps) => dispatch(action.showModal(modalType, modalProps))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResourceWrapper);
