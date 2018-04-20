import React from 'react';
import PropTypes from 'prop-types';
//TODO: implement dynamic imports
// https://www.slightedgecoder.com/2017/12/03/loading-react-components-dynamically-demand/
import NumberResource from './NumberResource';
import SwitchResource from './SwitchResource';
import MultiResource from './MultiResource';


class ResourceWrapper extends React.Component {
  render () {
    let Component;
    //TODO: add check for isWritable...
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
  smallForm: PropTypes.bool
};

ResourceWrapper.defaultProps = {
  multiResource: false,
  smallForm: false
};

export default ResourceWrapper;
