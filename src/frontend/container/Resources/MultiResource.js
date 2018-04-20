import React from 'react';
import PropTypes from 'prop-types';
import ResourceWrapper from './ResourceWrapper';

class MultiResource extends React.Component {
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
              <ResourceWrapper currentValue={this.props.currentValue[resource.label]} resource={resource} isWriteable={this.props.isWriteable} multiResource={false} smallForm={true}/>
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
  resource: PropTypes.object
};

export default MultiResource;
