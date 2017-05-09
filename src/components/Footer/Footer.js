import React from 'react';
import MyTheme from '../../MyTheme';

export default class Footer extends React.Component {
  render() {
    return (
      <footer style={{
        backgroundColor: MyTheme.palette.shadowColor,
        color: MyTheme.palette.alternateTextColor,
        padding: `50px 0`,
      }} >
        <p style={{textAlign: `center`}} >Copyright © 2017 Kitty House. All rights reserved.</p>
      </footer>
    );
  }
}

