import React from 'react';
import MyTheme from '../../../MyTheme';
import * as colors from 'material-ui/styles/colors';

let notificationThis = null;

export default class Notification extends React.Component {
  constructor(props) {
    super(props);
    notificationThis = this;
    this.state = {
      isVisible: false,
      props: {
        level: null,
        position: null,
        text: ''
      }
    };
  };

  showNotification() {
    this.setState({isVisible: true});
  }

  hideNotification() {
    this.setState({isVisible: false});
  }

  render() {
    const level = this.state.props.level || 'success';
    const levelMap = {
      success: MyTheme.palette.accent1Color,
      warning: colors.orange300,
      error: colors.redA200
    };
    let backgroundColor = levelMap[level];
    if (!backgroundColor) {
      throw "Notification error: attribute level should be one of ['success', 'warning', 'error']";
    }

    const styles = {
      width: '180px',
      height: '50px',
      backgroundColor: backgroundColor,
      position: 'fixed',
      boxShadow: '1px 2px 4px rgba(0, 0, 0, .5)',
      textAlign: 'center',
      zIndex: 10000,
      opacity: this.state.isVisible ? 1 : 0
    };

    const position = this.state.props.position || 'top-right';
    if (position === 'top-left') {
      styles.top = '20px';
      styles.left = '30px';
    } else if (position === 'top') {
      styles.top = '20px';
      styles.left = '43%';
    } else if (position === 'top-right') {
      styles.top = '20px';
      styles.right = '30px';
    } else if (position === 'left') {
      styles.left = '30px';
      styles.top = '50%';
    } else if (position === 'center') {
      styles.top = '43%';
      styles.left = '43%';
    } else if (position === 'right') {
      styles.right = '30px';
      styles.top = '50%';
    } else if (position === 'bottom-left') {
      styles.bottom = '20px';
      styles.left = '30px';
    } else if (position === 'bottom') {
      styles.bottom = '30px';
      styles.left = '43%';
    } else if (position === 'bottom-right') {
      styles.bottom = '20px';
      styles.right = '30px';
    } else {
      throw `Notification error. received unsupported property position: ${this.state.props.position}`;
    }

    Notification.show = (config) => {
      notificationThis.state.props.text = config.text;
      notificationThis.state.props.level = config.level || "success";
      notificationThis.state.props.position = config.position || 'top-right';
      notificationThis.state.props.isVisible = this.showNotification();
      notificationThis.state.props.duration = setTimeout(() => {
        this.hideNotification();
            }, 3000)
    };

    return (
        <div style={styles}>
          <h3 style={{lineHeight: '10px', color: MyTheme.palette.alternateTextColor}}>{this.state.props.text}</h3>
        </div>
    )
  }
}

