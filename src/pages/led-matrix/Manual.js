import React from 'react';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import MyTheme from '../../MyTheme';

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
      <div style={{marginTop: `35px`, width: `350px`}}>
        <Table style={{width: `300px`}}>
          <TableBody displayRowCheckbox={false} style={{border: `1px solid ${MyTheme.palette.borderColor}`}}>
            {
              matrix.map((row, rowI) => {
                return <TableRow key={rowI} style={{border: `0px`, height: `25px`}}>
                  {
                    row.map((cell, cellI) => (
                      <TableRowColumn key={`${rowI}${cellI}`} style={{
                        backgroundColor: MyTheme.palette.textColor,
                        paddingLeft: `8px`,
                        height: `25px`,
                      }}>
                        <div style={{
                          borderRadius: `25px`,
                          backgroundColor: MyTheme.palette.borderColor,
                          width: `25px`,
                          height: `25px`
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
    );
  }
}

