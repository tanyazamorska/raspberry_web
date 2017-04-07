import './Header.scss';
import React from 'react';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionPets from 'material-ui/svg-icons/action/pets';

export default class Header extends React.Component {
  render() {
    return (
      <AppBar className="k-header"
              iconElementLeft={<Link to={'/'}><IconButton><ActionPets className="k-pets-icon" /></IconButton></Link>}
      />
    )
  }
};

