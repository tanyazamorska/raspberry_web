import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {GridList} from 'material-ui/GridList';
import Toggle from 'material-ui/Toggle';
import _ from 'lodash';
import scssVariables from '../../../scssVariables';
import LedTable from './../LedTable.js';
import tickerData from './tickerData.json';

const newData = _.map(tickerData, function(item) {return item;});

const arrData = newData.map((el) => {
 for (let i = 0; i < el.length; i++) {
   const res = el[i].split('');
   const trueOrFalseArr = res.map(i => {
     //console.log(i)
     if (i === `.`) {
       i = false;
     } else {
       i = true;
     }
   });
   return trueOrFalseArr;
 }
});

//console.log(arrData)

const None = `None`;
const leftRight = `Left-Right`;
const rightLeft = `Right-Left`;
const topBottom = `Top-Bottom`;
const bottomTop = `Bottom-Top`;

const formGroupStyle = {
  marginBottom: {
    marginBottom: `50px`
  }
};

export default class Ticker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speed: 1,
      direction: None,
      text: ``,
      isRepeat: false,
      isRunning: false
    };
  }

  matrixThis = null;

  speedChange = (event, index, speed) => {
    this.setState({speed}); // {value: value}
  };

  directionChange = (event, index, direction) => {
    this.setState({direction});
  };

  SelectSpeed = () => {
    const items = _.range(1, 11).map(item => <MenuItem value={item} key={item} primaryText={`Speed ${item}`}/>);
    return (
      <SelectField
        floatingLabelText='Select speed'
        value={this.state.speed}
        onChange={this.speedChange}
        disabled={this.state.isRunning}>
        {items}
      </SelectField>
    );
  };

  SelectDirection = () => {
    return (
      <SelectField
        floatingLabelText='Select direction'
        value={this.state.direction}
        onChange={this.directionChange}
        disabled={this.state.isRunning}>
        <MenuItem value={None} primaryText={None}/>
        <MenuItem value={leftRight} primaryText={leftRight}/>
        <MenuItem value={rightLeft} primaryText={rightLeft}/>
        <MenuItem value={topBottom} primaryText={topBottom}/>
        <MenuItem value={bottomTop} primaryText={bottomTop}/>
      </SelectField>
    );
  };

  onClickGoButton = () => {
    this.setState({isRunning: !this.state.isRunning});

    const text = this.state.text;
    const firstLetter = text.charAt(0);

    // if (firstLetter === key) {
    //   console.log(newData)
    //   this.matrixThis.setState({matrix: newData});
    // }
    //console.log(this.matrixThis);
  };

  labelOfButton() {
    return this.state.isRunning ? `Stop` : `Go`;
  }

  onChecked = () => {
    this.setState({isRepeat: !this.state.isRepeat});
  };

  render() {
    return (
      <div style={{width: scssVariables.width}}>
        <GridList cols={2} cellHeight={450}>
          <div>
            <div style={formGroupStyle.marginBottom}>
              <TextField hintText='Type something'
                         onChange={(event, newValue) => {
                           this.setState({text: newValue});
                         }}
                         fullWidth={true} type='text'
                         disabled={this.state.isRunning}/>
              <RaisedButton label={this.labelOfButton()}
                            secondary={true}
                            onTouchTap={() => this.onClickGoButton()}
                            style={{float: `right`}}/>
            </div>
            <div style={formGroupStyle.marginBottom}>
              {this.SelectSpeed()}
            </div>
            <div style={formGroupStyle.marginBottom}>
              {this.SelectDirection()}
            </div>
            <div style={formGroupStyle.marginBottom}>
              <Toggle label='repeat'
                      labelPosition='right'
                      disabled={this.state.isRunning}
                      onToggle={this.onChecked}/>
            </div>
          </div>
          <div>
            <LedTable ref={(matrixThis) => this.matrixThis = matrixThis}/>
          </div>
        </GridList>
      </div>
    );
  }
}




