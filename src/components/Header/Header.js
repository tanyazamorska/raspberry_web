import React from 'react';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionPets from 'material-ui/svg-icons/action/pets';

export default class Header extends React.Component {
  render() {
    return (
      <AppBar
        iconElementLeft ={
          <Link to={'/'}>
            <IconButton>><ActionPets style={{display: 'block', width: '120px'}}/></IconButton>
          </Link>
        }
        zDepth={2}
      />
    )
  }
};

