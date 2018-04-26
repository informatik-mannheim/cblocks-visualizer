import React from 'react';
import PropTypes from 'prop-types';
import ResourceWrapper from './ResourceWrapper';


class MultiResource extends React.Component {

  requestChangeToSubresource (subresourceName, value) {
    const properties = this.props.resource.schema.properties;
    const newValue = {};
    Object.entries(properties).map((propertyKeyValue) => {
      const resource = propertyKeyValue[1];
      if (subresourceName === resource.label) {
        newValue[resource.label] = value;
      } else {
        newValue[resource.label] = this.props.currentValue[resource.label];
      }
    });

    this.props.sendRequest(this.props.objectID, this.props.instanceID, this.props.resource.resourceID, newValue);
  }

  render () {
    const name = this.props.resource.name;
    const properties = this.props.resource.schema.properties;

    return (
      <div>
        <div style={{textAlign: 'center', marginBottom: 4}}>{name}</div>
        {Object.entries(properties).map((propertyKeyValue) => {
          const resource = propertyKeyValue[1];
          resource.label = propertyKeyValue[0];
          return (
            <div key={resource.label + '_' + Math.random(1000)}>
              <ResourceWrapper
                objectID={this.props.objectID}
                instanceID={this.props.instanceID}
                resourceID={this.props.resource.resourceID}
                currentValue={this.props.currentValue[resource.label]}
                resource={resource}
                isWriteable={this.props.isWriteable}
                multiResource={false}
                smallForm={true}
                requestChangeToSubresource={this.requestChangeToSubresource.bind(this)}/>
              </div>
            );
          })}
        </div>
      );
    }
}

MultiResource.propTypes = {
  currentValue: PropTypes.any,
  instanceID: PropTypes.number,
  isWriteable: PropTypes.bool,
  objectID: PropTypes.number,
  resource: PropTypes.object,
  sendRequest: PropTypes.func
};

export default MultiResource;
