import React from 'react';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
//import ActionPets from 'material-ui/svg-icons/action/pets';
import theme from 'material-ui/styles/baseThemes/lightBaseTheme';

export default class Header extends React.Component {
  render() {
    return (
      <AppBar
        iconElementLeft ={
          <Link to={'/'}>
            <img src="https://assets-cdn.github.com/images/modules/logos_page/Octocat.png"  style={{width: 80, height: 80}}/>

          </Link>}
         style={{backgroundColor: theme.palette.accent3Color}}
        zDepth={2}
      />
    )
  }
};

//<ActionPets style={{width: 80, height: 80, color: theme.palette.accent1Color}}/>
