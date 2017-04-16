import React from 'react';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import theme from 'material-ui/styles/baseThemes/lightBaseTheme';

export default class Header extends React.Component {
  render() {
    return (
      <AppBar
        iconElementLeft ={
          <Link to={'/'}>
            <img src="logo.png"
                 style={{width: 80, height: 80}}/>
          </Link>}
         style={{backgroundColor: theme.palette.accent3Color}}
      />
    )
  }
};


