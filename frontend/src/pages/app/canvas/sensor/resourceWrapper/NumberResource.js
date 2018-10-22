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
import { connect } from 'react-redux';
import Constants from '../../../../../Constants';

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

      const getMappingPalette = i => {
        const COLORS = Constants.Colors;
        switch (i % 3) {
          case 0: return COLORS.secondary_1;
          case 1: return COLORS.secondary_2;
          case 2: return COLORS.complementary;
          default: return COLORS.primary;
        }
      };

      const normalizedMappings = (mappings) => {
        const newMappings = [];

        for (let i = 0; i < mappings.length; i++) {
          const mapping = mappings[i];
          const mappingPalette = getMappingPalette(i);

          switch (mapping.mappingType) {
            case 'category': {
              const normalizedRanges = [];
              const ranges = mapping.ranges;
              let j = 0;
              for (const range of ranges) {
                  normalizedRanges.push({
                    color: mappingPalette[j++],
                    label: range.label,
                    low: range.greaterEqualsThan,
                    high: range.lessThan
                  });
              }
              newMappings.push({
                label: mapping.label,
                mappingType: mapping.mappingType,
                ranges: normalizedRanges,
                active: true
              });
              break;
            }
            case 'range': {
              const ranges = [{
                color: mappingPalette[2],
                label: mapping.label,
                low: mapping.greaterEqualsThan,
                high: mapping.lessEqualsThan
              }];
              newMappings.push({
                label: mapping.label,
                mappingType: mapping.mappingType,
                ranges: ranges,
                active: false
              });
              break;
            }
            case 'label':
              console.error('NOT IMPLEMENTED: label mappings');
              return;
            default:
              console.error(`No such mapping type: ${mapping.mappingType}`);
          }
        }
        return newMappings;
      };

      return (
        <div>
            <Typography variant='title' align='center' style={{marginBottom: 20}}>{this.props.resource.name}</Typography>
            <div>
              <Typography variant='headline' align='center' style={{marginBottom: 40}}>{this.props.currentValue
                + ' ' + this.props.resource.unit}</Typography>
              <SensorBar
                currentValue={this.props.currentValue}
                mappings={normalizedMappings(this.props.mappings)}
                max={max}
                min={min}
                style={{marginBottom: 0}}/>
              <div style={{display: 'block', float: 'left'}}>
                <Typography variant='body2'>{0}</Typography>
              </div>
              <div style={{display: 'block', float: 'right', marginTop: 0}}>
                <Typography variant='body2'>{100}</Typography>
              </div>
            </div>

            <br/>
            {
              //TODO: put the button back in
              /* <div style={{float: 'right', marginBottom: 10}}>
              <Button variant='fab' mini aria-label="Show Graph" color='secondary' onClick={() => this.props.showModal('CHART', chartModalProps)}>
                {graphIcon}
              </Button>
            </div> */

            //TODO: move this part to generic ResourceWrapper component
            }
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

const mapStateToProps = (state, ownProps) => {
  const mappingIDList = ownProps.resource.mappings;
  const mappings = [];
  for (const mappingID of mappingIDList) {
    mappings.push(state.mappings[mappingID]);
  }
  return {mappings: mappings};
};
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NumberResource);
