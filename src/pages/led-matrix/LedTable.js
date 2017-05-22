import React from 'react';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import * as _colors from 'material-ui/styles/colors';
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

  clickMe = (rowI, cellI) => {
    const newMatrix = this.state.matrix;
    newMatrix[rowI][cellI] = !newMatrix[rowI][cellI];
    this.setState({matrix: newMatrix});
  };

  render() {
    return (
      <div style={{marginTop: `35px`, display: `flex`, justifyContent: `center`}}>
        <div style={{width: `400px`, margin: `auto`}}>
          <Table style={{width: `400px`, border: `5px solid ${MyTheme.palette.textColor}`}}>
            <TableBody displayRowCheckbox={false}>
              {
                this.state.matrix.map((row, rowI) => {
                  return <TableRow key={rowI} style={{border: `0px`}}>
                    {
                      row.map((cell, cellI) => {
                        let colorCell = null;
                        let boxShadow = null;
                        if(cell === false) {
                          colorCell = _colors.grey600;
                        } else {
                          colorCell = _colors.yellowA100;
                          boxShadow = `0px 0px 10px ${colorCell},0px 0px 10px ${colorCell},0px 0px 10px ${colorCell}`;
                        }
                        return (
                          <TableRowColumn key={`${rowI}${cellI}`} style={{
                            backgroundColor: MyTheme.palette.textColor,
                            paddingLeft: `7px`,
                            paddingRight: `7px`
                          }}>
                            <div style={{
                              borderRadius: `35px`,
                              backgroundColor:  colorCell,
                              width: `35px`,
                              height: `35px`,
                              boxShadow: boxShadow,
                            }} onClick={() => this.clickMe(rowI, cellI)}>
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