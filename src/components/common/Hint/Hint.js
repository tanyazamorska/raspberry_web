import React from 'react';
import MyTheme from '../../../MyTheme';

export default class Hint extends React.Component {
  arrowStyles = {
    borderTop: `15px solid transparent`,
    borderBottom: `15px solid transparent`,
    position: `absolute`,
    bottom: `7px`
  };

  positionAroundBorder = `15px solid ${MyTheme.palette.accent1Color}`;

  render() {
    if (this.props.arrowDirection === `right`) {
      this.arrowStyles.borderLeft = this.positionAroundBorder;
      this.arrowStyles.right = `-10px`;
    } else if (this.props.arrowDirection === `left`) {
      this.arrowStyles.borderRight = this.positionAroundBorder;
      this.arrowStyles.left = `-10px`;
    } else {
      throw `Hint error: attribute 'arrowDirection' should be one of ['left', 'right']`;
    }

    return (
      <div style={{padding: `0 35px 0 35px`}}>
        <div style={{
          display: `inline-block`,
          padding: `20px`,
          backgroundColor: MyTheme.palette.accent1Color,
          marginBottom: `10px`,
          borderRadius: `10px`,
          position: `relative`,
        }}>
          {this.props.children}
          <div style={this.arrowStyles}>
          </div>
        </div>
      </div>
    );
  }
}



