import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <footer style={{
        backgroundColor: '#061319',
        height: 80,
        color: 'white',
        padding: '15px 0',
      }} >
        <p style={{textAlign: 'center'}} >Copyright © 2017 Kitty House. All rights reserved.</p>
      </footer>
    )
  }
}

