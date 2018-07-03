import React from 'react';
import PropTypes from 'prop-types';
//TODO: implement dynamic imports
// https://www.slightedgecoder.com/2017/12/03/loading-react-components-dynamically-demand/
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
  currentValue: PropTypes.any,
  instanceID: PropTypes.number,
  isWriteable: PropTypes.bool,
  multiResource: PropTypes.bool,
  objectID: PropTypes.number,
  resource: PropTypes.object,
  sendRequest: PropTypes.func,
  smallForm: PropTypes.bool
};

ResourceWrapper.defaultProps = {
  multiResource: false,
  smallForm: false
};

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => {
  return {
    sendRequest: (objectID, instanceID, resourceID, value) => dispatch(action.sendRequest(objectID, instanceID, resourceID, value)),
    showModal: (modalType, modalProps) => dispatch(action.showModal(modalType, modalProps))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResourceWrapper);
