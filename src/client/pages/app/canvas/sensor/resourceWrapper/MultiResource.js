import React from 'react';
import PropTypes from 'prop-types';
import ResourceWrapper from '../ResourceWrapper';
import Typography from '@material-ui/core/Typography';
import deepEqual from 'deep-equal';

class MultiResource extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    if (deepEqual(nextProps.currentValue, this.props.currentValue)) {
      return false;
    } else {
      return true;
    }
  }

  requestChangeToSubresource (subresourceName, value) {
    const properties = this.props.resource.schema.properties;
    const newValue = {};
    Object.entries(properties).map(propertyKeyValue => {
      const resource = propertyKeyValue[1];
      if (subresourceName === resource.label) {
        newValue[resource.label] = value;
      } else {
        newValue[resource.label] = this.props.currentValue[resource.label];
      }
    });

    this.props.buildRequest(
      this.props.objectID,
      this.props.instanceID,
      this.props.resource.resourceID,
      newValue
    );
  }

  render () {
    const name = this.props.resource.name;
    const properties = this.props.resource.schema.properties;

    return (
      <div>
        <Typography variant="subheading" align="center">
          {name}
        </Typography>
        {Object.entries(properties).map(propertyKeyValue => {
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
                smallForm
                requestChangeToSubresource={this.requestChangeToSubresource.bind(
                  this
                )}
              />
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
  buildRequest: PropTypes.func
};

export default MultiResource;
