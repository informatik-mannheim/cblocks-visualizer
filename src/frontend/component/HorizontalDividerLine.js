import React from 'react';

export class HorizontalDividerLine extends React.Component {

  render () {

    const style = {
      border: 0,
      height: '1px',
      backgroundImage: '-webkit-linear-gradient(left, #f0f0f0, #dfdfdf, #f0f0f0)',
      width: '90%'
    };

    return (
      <div>
        <hr style={style}/>
      </div>
    );
  }
}
