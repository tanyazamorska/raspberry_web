import React from 'react';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionPets from 'material-ui/svg-icons/action/pets';

// const style= {
//   iconPets: {
//     display:'block',
//     width: 60,
//     height: 60,
//   }
// };

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

