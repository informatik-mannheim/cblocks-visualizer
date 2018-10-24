import React from 'react';
import PropTypes from 'prop-types';
import { HorizontalDividerLine } from '../../../../../../components/HorizontalDividerLine';
import CategoryMapping from './CategoryMapping';

class MappingDrawer extends React.Component {
  render = () => {
    return (
      <div style={{
        background: '#F5F5F6',
        boxShadow: 'inset 0 -7px 9px -7px rgba(0,0,0,0.2)'
        }}
        className='mapping-drawer'>
      <div style={{height: 20}}/>
        {Object.entries(this.props.mappings).map((mappingsKeyValue) => {
          const currentMapping = mappingsKeyValue[1];
          return (
            <div
              key={currentMapping.mappingID + '_div'}
              style={{paddingBottom: 16}}
              >
              <CategoryMapping mapping={currentMapping}/>
            </div>
          );
        })}
      </div>
    );
  }
}

MappingDrawer.propTypes = {
  expanded: PropTypes.bool,
  mappings: PropTypes.array
};

export default MappingDrawer;
