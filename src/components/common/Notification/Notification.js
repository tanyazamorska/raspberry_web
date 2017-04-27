import React from 'react';
import ActionCheck from 'material-ui/svg-icons/action/check-circle';
import theme from 'material-ui/styles/baseThemes/lightBaseTheme';

export default class Notification extends React.Component {
  render() {
    return (
        <div style={{
          width: '180px',
          height: '50px',
          backgroundColor: theme.palette.primary1Color,
          position: 'absolute',
          top: '75px',
          right: '0px',
          boxShadow: '1px 2px 4px rgba(0, 0, 0, .5)',
          opacity: this.props.isVisible ? 1 : 0
        }}>
          <ActionCheck style={{color: 'white', position: 'relative', top: '15px', left: '15px'}}/>
          <h3 style={{color: 'white', position: 'absolute', top: '-3px', marginLeft: '55px'}}>File saved</h3>
        </div>
    )
  }
}