import React from 'react';
import MyTheme from '../../../MyTheme';

export default class Hint extends React.Component {
  styles = {
    borderTop: `15px solid transparent`,
    borderBottom: `15px solid transparent`,
    position: `absolute`,
    bottom: `7px`
  };

  render() {
    const positionAroundBorder = `15px solid ${MyTheme.palette.accent1Color}`;
    if (this.props.arrowDirection === `right`) {
      this.styles.borderLeft = positionAroundBorder;
      this.styles.right = `-10px`;
    } else if (this.props.arrowDirection === `left`) {
      this.styles.borderRight = positionAroundBorder;
      this.styles.left = `-10px`;
    }

    return (
      <div>
        <div style={{
          display: `inline-block`,
          padding: `20px`,
          backgroundColor: MyTheme.palette.accent1Color,
          marginBottom: `10px`,
          borderRadius: `10px`,
          position: `relative`,
        }}>
          {this.props.children}
          <div style={this.styles}>
          </div>
        </div>
      </div>
    );
  }
}



