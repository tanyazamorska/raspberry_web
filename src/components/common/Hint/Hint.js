import React from 'react';
import MyTheme from '../../../MyTheme';

export default class Hint extends React.Component {
  render() {
    return (
      <div>
        <div style={{
          width: `245px`,
          paddingBottom: `25px`,
          backgroundColor: MyTheme.palette.accent1Color,
          borderRadius: `10px`,
          textAlign: `center`,
        }}
        >
          {this.props.text}
          <div style={{
            width: `0px`,
            height: `0px`,
            borderTop: `20px solid transparent`,
            borderBottom: `20px solid transparent`,
            borderRight: `20px solid ${MyTheme.palette.accent1Color}`,
            position: `relative`,
            display: `inline-block`,
            left: `-187px`,
            top: `20px`
          }}>
          </div>
        </div>
      </div>
    );
  }
}
