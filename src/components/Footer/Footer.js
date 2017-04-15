import React from 'react';
import theme from 'material-ui/styles/baseThemes/lightBaseTheme';

export default class Footer extends React.Component {
  render() {
    return (
      <footer style={{
        backgroundColor: theme.palette.textColor,
        color: theme.palette.alternateTextColor,
        padding: '50px 0',
      }} >
        <p style={{textAlign: 'center'}} >Copyright © 2017 Kitty House. All rights reserved.</p>
      </footer>
    )
  }
}

