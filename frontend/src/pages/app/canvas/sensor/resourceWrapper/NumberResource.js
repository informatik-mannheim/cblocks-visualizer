import React from 'react';
import PropTypes from 'prop-types';
import MaterialSlider from '../../../../../components/MaterialSlider';
import SensorBar from '../../../../../components/SensorBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import svgIcons from '../../../../../images/svgIcons';
import { HorizontalDividerLine } from '../../../../../components/HorizontalDividerLine';
import CategoryMapping from './numberResource/CategoryMapping';

class NumberResource extends React.Component {
  render () {
    if (this.props.smallForm === false) {
      //Single Resource
      const max = this.props.resource.schema.maximum;
      const min = this.props.resource.schema.minimum;

      const graphIcon = (
        <SvgIcon>
          <path d={svgIcons.chart} />
        </SvgIcon>
      );

      const chartModalProps = {
        open: true,
        objectID: this.props.objectID,
        instanceID: this.props.instanceID,
        resourceID: this.props.resource.resourceID
      };

      const NumberResourceComponent = (
        <div>
            <Typography variant='headline' align='center'>{this.props.resource.name}</Typography>
            <br/>
            <br/>
            <div>
              <SensorBar
                currentValue={this.props.currentValue}
                max={max}
                min={min}/>
              <div style={{display: 'block', float: 'left'}}>
                <Typography variant='body2'>{min}</Typography>
              </div>
              <div style={{display: 'block', float: 'right'}}>
                <Typography variant='body2'>{max}</Typography>
              </div>
            </div>

            <br/>
            <Typography variant='title' align='center'>{this.props.currentValue
              + ' ' + this.props.resource.schema.unit}</Typography>
            <div style={{float: 'right', marginBottom: 10}}>
              <Button variant='fab' mini aria-label="Show Graph" color='secondary' onClick={() => this.props.showModal('CHART', chartModalProps)}>
                {graphIcon}
              </Button>
            </div>
            {Object.entries(this.props.mappings).map((mappingsKeyValue) => {
              const currentMapping = mappingsKeyValue[1];
              return (
                <div key={currentMapping.mappingID + '_div'}>
                  <HorizontalDividerLine isMappingDivider={true}/>
                  <CategoryMapping
                    mapping={currentMapping}
                    currentValue={this.props.currentValue}
                    max={max}
                    min={min}/>
                </div>
              );
            })}
        </div>
      );

      return NumberResourceComponent;
    } else {
      //Multi Resource
      const max = this.props.resource.maximum;
      const min = this.props.resource.minimum;

      return (
        <div>
          <MaterialSlider
            objectID={this.props.objectID}
            instanceID={this.props.instanceID}
            resourceID={this.props.resource.resourceID}
            currentValue={this.props.currentValue}
            maximum={max}
            minimum={min}
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
          <br/>
          <br/>
        </div>
      );
    }
  }
}

NumberResource.propTypes = {
  buildRequest: PropTypes.func,
  currentValue: PropTypes.any,
  instanceID: PropTypes.number,
  isWriteable: PropTypes.bool,
  mappings: PropTypes.array,
  objectID: PropTypes.number,
  requestChangeToSubresource: PropTypes.func,
  resource: PropTypes.object,
  showModal: PropTypes.func,
  smallForm: PropTypes.bool
};

NumberResource.defaultProps = {
  smallForm: false
};

export default NumberResource;
