import React from 'react';
import theme from 'material-ui/styles/baseThemes/lightBaseTheme';
import * as colors from 'material-ui/styles/colors';

let notificationThis = null;

export default class Notification extends React.Component {
  componentDidMount() {
    notificationThis = this;
    this.setState({isNotificationVisible: true});
    console.log('componentDidMount ' + notificationThis)
  }

  render() {
    console.log('render ' + this)
    const level = this.props.level || 'success';
    const levelMap = {
      success: colors.green300,
      warning: colors.orange300,
      error: colors.red400
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
      opacity: this.props.isVisible ? 1 : 0
    };

    const position = this.props.position || 'top-right';
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
      throw `Notification error. received unsupported property position: ${this.props.position}`;
    }

    return (
        <div style={styles}>
          <h3 style={{lineHeight: '10px', color: theme.palette.canvasColor}}>{this.props.text}</h3>
        </div>
    )
  }
}

Notification.show = function (props) {
  console.log('Notification show func')
notificationThis.props = props;
  props.level = props.level || "success";
  props.position = props.position || "top-right";
  props.isVisible = true;
  props.duration = 3000;
  setTimeout(() => {
  console.log(123)
  },props.duration);
  console.log(notificationThis);
};

// setTimeout(() => {
//   self.hideNotification()
// }, 3000)

// Notification.show({
//   text: "File Saved",     // required
//   level: "success",       // optional. default success
//   position: "top-right",  // optional. default "top-right"
//   duration: 3000          // optional
// });
