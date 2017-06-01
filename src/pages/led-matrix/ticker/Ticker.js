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

const None = `None`;
const leftRight = `Left-Right`;
const rightLeft = `Right-Left`;
const topBottom = `Top-Bottom`;
const bottomTop = `Bottom-Top`;

//var str = `123`;
/*[
  "................................",
  "...........x......xxx....xxx....",
  "..........xx.....x...x..x...x...",
  "...........x.....x...x..x...x...",
  "...........x........x......x....",
  "...........x.......x........x...",
  "...........x......x.....x...x...",
  "..........xxx....xxxxx...xxx...."
]*/

const formGroupStyle = {
  marginBottom: {
    marginBottom: `40px`
  }
};

const data = {};
for (const key in tickerData) {
  const matrix = tickerData[key].map(stringLine => {
    const arrOfDotsAndX = stringLine.split(``);
    const arrOfBooleans = arrOfDotsAndX.map(el => el === `x`);
    return arrOfBooleans;
  });
  data[key] = matrix;
}

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

  timerId = null;

  run() {
    this.setState({isRunning: !this.state.isRunning});

    const text = this.state.text;
    let indexOfLetter = 0;
    this.timerId = setInterval(() => {
      if (indexOfLetter >= text.length) {
        clearInterval(this.timerId);
        this.matrixThis.setState({matrix: data[`_all_off`]});
        this.state.isRepeat === false ? this.setState({isRunning: !this.state.isRunning}) : null;
      } else {
        const letter = text.toUpperCase().charAt(indexOfLetter);
        if (data[letter]) {
          this.matrixThis.setState({matrix: data[letter]});
          indexOfLetter++;
        } else {
          clearInterval(this.timerId);
          throw `Ticker error: \'${text}\' isn't encoded`;
        }
      }
    }, 1000);
  }

  stop() {
    this.setState({isRunning: !this.state.isRunning});
    clearInterval(this.timerId);
    this.matrixThis.setState({matrix: data[`_all_off`]});
  }

  onClickGoButton = () => {
    if (!this.state.isRunning) {
      this.run();
    } else {
      this.stop();
    }
  };

  labelOfButton() {
    return this.state.isRunning ? `Stop` : `Go`;
  }

  onChecked = () => {
    this.setState({isRepeat: !this.state.isRepeat});
  };

  render() {
    const isText = this.state.text === `` ? true : false;

    return (
      <div style={{width: scssVariables.width}}>
        <GridList cols={2} cellHeight={450}>
          <div>
            <div style={formGroupStyle.marginBottom}>
              <TextField hintText='Type something'
                         value={this.state.text}
                         onChange={(event, newValue) => {
                           this.setState({text: newValue});
                         }}
                         fullWidth={true} type='text'
                         disabled={this.state.isRunning}/>
              <RaisedButton label={this.labelOfButton()}
                            secondary={true}
                            onTouchTap={() => this.onClickGoButton()}
                            disabled={isText}
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

