import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootswatch/paper/bootstrap.min.css'
import './styles.scss';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>It Works!</h1>
        <p>This React project just works including <span className="redBg">module</span> local styles.</p>
        <p>Enjoy!</p>
      </div>
    )
  }
}


console.log(123123);