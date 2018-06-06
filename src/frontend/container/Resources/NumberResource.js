import React from 'react';
import PropTypes from 'prop-types';
import StatusBar from '../../component/StatusBar';
import colorString from 'color-string';
import Typography from '@material-ui/core/Typography';

class NumberResource extends React.Component {
  render () {
    if (this.props.smallForm === false) {
      //Single Resource
      const max = this.props.resource.schema.maximum;
      const min = this.props.resource.schema.minimum;

      return (
        <div>
            <Typography variant='subheading' align='center'>{this.props.resource.name}</Typography>
            <div>
              <StatusBar
                objectID={this.props.objectID}
                instanceID={this.props.instanceID}
                resourceID={this.props.resource.resourceID}
                currentValue={this.props.currentValue}
                maximum={max}
                minimum={min}
                isWriteable={this.props.isWriteable}
                requestChangeToSubresource={this.props.requestChangeToSubresource}/>

              <div style={{display: 'block', float: 'left'}}>
                <Typography variant='body2'>{min}</Typography>
              </div>
              <div style={{display: 'block', float: 'right'}}>
                <Typography variant='body2'>{max}</Typography>
              </div>

            </div>
            <Typography variant='display1' align='center'>{this.props.currentValue
              + ' ' + this.props.resource.schema.unit}</Typography>
        </div>
      );
    } else {
      //Multi Resource
      const max = this.props.resource.maximum;
      const min = this.props.resource.minimum;

      const barColor = colorString.get.rgb(this.props.resource.label) !== null ? this.props.resource.label : undefined;

      return (
        <div>
            <div style={{display: 'block'}}>
              <div style={{width: '90%', float: 'right'}}>
                <StatusBar
                  objectID={this.props.objectID}
                  instanceID={this.props.instanceID}
                  resourceID={this.props.resource.resourceID}
                  currentValue={this.props.currentValue}
                  maximum={max}
                  minimum={min}
                  color={barColor}
                  height={20}
                  isWriteable={this.props.isWriteable}
                  requestChangeToSubresource={this.props.requestChangeToSubresource}
                  label={this.props.resource.label}/>
                  <div style={{display: 'block', float: 'left'}}>
                    <Typography variant='body2'>{min}</Typography>
                  </div>
                  <div style={{display: 'block', float: 'right'}}>
                    <Typography variant='body2'>{max}</Typography>
                  </div>
              </div>
            </div>
        </div>
      );
    }
  }
}

NumberResource.propTypes = {
  currentValue: PropTypes.any,
  instanceID: PropTypes.number,
  isWriteable: PropTypes.bool,
  objectID: PropTypes.number,
  requestChangeToSubresource: PropTypes.func,
  resource: PropTypes.object,
  sendRequest: PropTypes.func,
  smallForm: PropTypes.bool
};

NumberResource.defaultProps = {
  smallForm: false
};

export default NumberResource;
