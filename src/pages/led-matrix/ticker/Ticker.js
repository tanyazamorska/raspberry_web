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

const directionNone = `None`;
const directionLeftRight = `Left-Right`;
const directionRightLeft = `Right-Left`;
const directionTopBottom = `Top-Bottom`;
const directionBottomTop = `Bottom-Top`;

const data = {};
for (const key in tickerData) {
  const matrix = tickerData[key].map(stringLine => {
    const arrOfDotsAndX = stringLine.split(``);
    const arrOfBooleans = arrOfDotsAndX.map(el => el === `x`);
    return arrOfBooleans;
  });
  data[key] = matrix;
}

const formGroupStyle = {
  marginBottom: {
    marginBottom: `40px`
  }
};

export default class Ticker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speed: 7,
      direction: directionNone,
      text: ``,
      isRepeat: false,
      isRunning: false
    };
  }

  speedDictionary = {
    1: 3000,
    2: 2000,
    3: 1500,
    4: 1000,
    5: 900,
    6: 800,
    7: 700,
    8: 600,
    9: 500,
    10: 300
  };

  speedValue() {
    return this.speedDictionary[this.state.speed];
  }

  speedChange = (event, index, speed) => {
    this.setState({speed}); // {speed: speed}
  };

  directionChange = (event, index, direction) => {
    this.setState({direction}); // {direction: direction}
  };

  selectSpeed = () => {
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

  selectDirection = () => {
    return (
      <SelectField
        floatingLabelText='Select direction'
        value={this.state.direction}
        onChange={this.directionChange}
        disabled={this.state.isRunning}>
        <MenuItem value={directionNone} primaryText={directionNone}/>
        <MenuItem value={directionLeftRight} primaryText={directionLeftRight}/>
        <MenuItem value={directionRightLeft} primaryText={directionRightLeft}/>
        <MenuItem value={directionTopBottom} primaryText={directionTopBottom}/>
        <MenuItem value={directionBottomTop} primaryText={directionBottomTop}/>
      </SelectField>
    );
  };

  buildTallMatrix = (someText) => {
    return _.chain(someText)
      .map(letter => letter.toUpperCase())
      .map(letter => data[letter])
      .flatten()
      .value();

    //
    // const matrix = [];
    // for (let j = 0; j < someText.length; j++) {
    //   const symbol = someText[j].toUpperCase();
    //   data[symbol].forEach(el => {
    //     matrix.push(el);
    //   });
    // }
    // return matrix;
  };

  buildTallMatrixForDirectionTopBottom = (someText) => {
    const arrSomeText = someText.split(``);
    const reverseSomeText = _.reverse(arrSomeText).join(``);
    const matrix = [];
    for (let j = 0; j < reverseSomeText.length; j++) {
      const symbol = (reverseSomeText[j]).toUpperCase();
      data[symbol].forEach(el => {
        matrix.push(el);
      });
    }
    return matrix;
  };

  buildWidthMatrix = (someText) => {
    const matrix = [];
    // const one = [];
    // const two = [];
    // const three = [];
    // const four = [];
    // const five = [];
    // const six = [];
    // const seven = [];
    // const eight = [];
    for (let j = 0; j < someText.length; j++) {
      const symbol = (someText[j]).toUpperCase();

      data[symbol].forEach((el, index) => {
        // if (index === 0) {
        //   one.push(el);
        // } else if (index === 0) {
        //   two.push(el);
        // }
        matrix.push(el);
      });
    }
    // console.log(one)
    // console.log(two)

    const widthMatrix = [];
    for (let i = 0; i < matrix.length /someText.length; i++) {
      widthMatrix.push(matrix[i].concat(matrix[i + 8],matrix[i + 16]))
    }
    return matrix;
  };

  runTallMatrixDirectionTopBottom = () => {
    const tallMatrix = this.buildTallMatrixForDirectionTopBottom(this.state.text);
    let from = tallMatrix.length - 8;
    const timerId2 = setInterval(() => {
      if (from === 0) {
        clearInterval(timerId2);
      }
      const pieceOfTallMatrix = tallMatrix.slice(from, from + 8);
      this.matrixThis.setState({matrix: pieceOfTallMatrix});
      from--;
    }, this.speedValue());
  };

  runTallMatrixDirectionBottomTop = () => {
    const tallMatrix = this.buildTallMatrix(this.state.text);
    let from = 0;
    const timerId1 = setInterval(() => {
      if (from === tallMatrix.length - 8) {
        clearInterval(timerId1);
      }
      const pieceOfTallMatrix = tallMatrix.slice(from, from + 8);
      this.matrixThis.setState({matrix: pieceOfTallMatrix});
      from++;
    }, this.speedValue());
  };

  timerId = null;
  matrixThis = null;

  runDirectionNone() {
    const text = this.state.text;
    let indexOfLetter = 0;

    this.timerId = setInterval(() => {
      if (indexOfLetter >= text.length) { // letters ended
        this.stop();
        if (this.state.isRepeat) {
          this.run();
        }
      } else { // render letter
        const letter = text.toUpperCase().charAt(indexOfLetter);
        if (data[letter]) {
          this.matrixThis.setState({matrix: data[letter]});
          indexOfLetter++;
        } else {
          this.matrixThis.setState({matrix: data.encode});
          console.warn(`Ticker warning: \'${letter}\' isn't encoded`);
          indexOfLetter++;
        }
      }
    }, this.speedValue());
  }

  run() {
    this.setState({isRunning: true});
    if (this.state.direction === directionNone) {
      this.runDirectionNone();
    } else if (this.state.direction === directionBottomTop) {
      this.runTallMatrixDirectionBottomTop();
    } else if (this.state.direction === directionTopBottom) {
      this.runTallMatrixDirectionTopBottom();
    } else if (this.state.direction === directionLeftRight) {
      this.buildWidthMatrix(this.state.text);
    }
  }

  stop() {
    this.setState({isRunning: false});
    clearInterval(this.timerId);
    this.matrixThis.setState({matrix: data._all_off});
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
              {this.selectSpeed()}
            </div>
            <div style={formGroupStyle.marginBottom}>
              {this.selectDirection()}
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

