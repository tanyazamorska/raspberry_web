import React from 'react';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import * as _colors from 'material-ui/styles/colors';
import MyTheme from '../../MyTheme';
import Hint from '../../components/common/Hint/Hint';

export default class Manual extends React.Component {
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
        [false, false, false, false, false, false, true, true]
      ]
    };
  }

  clickMe = (cellI, rowI) => {
    this.state.matrix[rowI][cellI] = !this.state.matrix[rowI][cellI];
    return this.state.matrix;
  };

  render() {
    return (
      <div style={{marginTop: `35px`, display: `flex`, justifyContent: `center`}}>
        <div style={{width: `380px`, margin: `auto`}}>
          <Table style={{width: `380px`, border: `5px solid ${MyTheme.palette.textColor}`}}>
            <TableBody displayRowCheckbox={false}>
              {
                this.state.matrix.map((row, rowI) => {
                  return <TableRow key={rowI} style={{border: `0px`}}>
                    {
                      row.map((cell, cellI) => {
                        let colorCell = null;
                        if(cell === false) {
                          colorCell = _colors.grey600;
                        } else {
                          colorCell = _colors.yellowA100;
                        }
                        return (
                        <TableRowColumn key={`${rowI}${cellI}`} style={{
                          backgroundColor: MyTheme.palette.textColor,
                          paddingLeft: `4.5px`,
                        }}>
                          <div style={{
                            borderRadius: `35px`,
                            backgroundColor:  colorCell,
                            width: `35px`,
                            height: `35px`,
                            boxShadow: `0px 0px 10px ${colorCell}`
                          }} onClick={() => this.clickMe(cellI, rowI)}>
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
        <div style={{width: `575px`}}>
          <Hint text='Click on the circle!'/>
        </div>
      </div>
    );
  }
}

