import React from 'react';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import * as _colors from 'material-ui/styles/colors';
import MyTheme from '../../MyTheme';
import Hint from '../../components/common/Hint/Hint';


export default class Manual extends React.Component {
  render() {
    const matrix = [
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false]
    ];

    return (
      <div style={{marginTop: `35px`, display: `flex`, justifyContent: `center`}}>
        <div style={{width: `380px`, margin: `auto`}}>
          <Table style={{width: `380px`, border: `5px solid ${MyTheme.palette.textColor}`}}>
            <TableBody displayRowCheckbox={false}>
              {
                matrix.map((row, rowI) => {
                  return <TableRow key={rowI} style={{border: `0px`}}>
                    {
                      row.map((cell, cellI) => (
                        <TableRowColumn key={`${rowI}${cellI}`} style={{
                          backgroundColor: MyTheme.palette.textColor,
                          paddingLeft: `4.5px`,
                        }}>
                          <div style={{
                            borderRadius: `35px`,
                            backgroundColor: _colors.grey600,
                            width: `35px`,
                            height: `35px`
                          }}>
                          </div>
                        </TableRowColumn>
                      ))
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

