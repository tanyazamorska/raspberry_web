import React from 'react';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import * as _colors from 'material-ui/styles/colors';
import _ from 'lodash';
import MyTheme from '../../MyTheme';

export default class LedTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: [
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false]
      ]
    };
  }

  onLedClick = (rowI, cellI) => {
    if (_.isFunction(this.props.onLedClick)) {
      this.props.onLedClick(this.state, rowI, cellI);
    }
    // const newMatrix = this.state.matrix;
    // newMatrix[rowI][cellI] = !newMatrix[rowI][cellI];
    // this.setState({matrix: newMatrix});
  };

  render() {
    return (
      <div style={{display: `flex`, justifyContent: `center`}}>
        <Table style={{width: `400px`, margin: `auto`}}>
          <TableBody displayRowCheckbox={false}>
            {
              this.state.matrix.map((row, rowI) => {
                return <TableRow key={rowI} style={{border: `0px`}}>
                  {
                    row.map((cell, cellI) => {
                      let colorCell = null;
                      let boxShadow = null;
                      if (cell === false) {
                        colorCell = _colors.grey600;
                      } else {
                        colorCell = _colors.yellowA100;
                        boxShadow = `0px 0px 10px ${colorCell},0px 0px 10px ${colorCell},0px 0px 10px ${colorCell}`;
                      }
                      return (
                        <TableRowColumn key={`${rowI}${cellI}`}
                                        style={{backgroundColor: MyTheme.palette.textColor, paddingLeft: `7px`}}
                        >
                          <div style={{
                            borderRadius: `35px`,
                            backgroundColor: colorCell,
                            width: `35px`,
                            height: `35px`,
                            boxShadow: boxShadow,
                          }} onClick={() => this.onLedClick(rowI, cellI)}>
                          </div>
                        </TableRowColumn>
                      );
                    })
                  }
                </TableRow>;
              })
            }
          </TableBody>
        </Table>
      </div>
    );
  }
}


// const m = [
//   "00010000",
//   "00010000",
//   "00110000",
//   "00010000",
//   "00010000",
//   "00010000",
//   "00010000",
//   "00111000"
// ]

