import React from 'react';
import {Table, TableBody, TableRow, TableHeaderColumn, TableHeader, TableRowColumn} from 'material-ui/Table';
import scssVariables from '../../scssVariables';
import MyTheme from '../../MyTheme';
import data from './data.js';

const newArr = [];
for (let i = 0; i < data.length; i = i + 2) {
  newArr.push([data[i], data[i + 1]]);
}

export default class GPIO extends React.Component {
  render() {
    return (
      <div style={{width: scssVariables.width}}>
        <div style={{width: parseInt(scssVariables.width, 10) / 2, margin: `auto`}}>
          <h3 style={{textAlign: `center`}}>
            Raspberry Pi 3 Model B (J8 Header)
          </h3>
          <Table style={{border: `1px solid ${MyTheme.palette.borderColor}`}}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn style={{color: MyTheme.palette.textColor, width: `19px`}}>
                  GPIO#
                </TableHeaderColumn>
                <TableHeaderColumn style={{color: MyTheme.palette.textColor, width: `60px`}}>
                  NAME
                </TableHeaderColumn>
                <TableHeaderColumn>

                </TableHeaderColumn>
                <TableHeaderColumn style={{width: `60px`, color: MyTheme.palette.textColor}}>
                  NAME
                </TableHeaderColumn>
                <TableHeaderColumn style={{width: `21px`, paddingRight: `34px`, color: MyTheme.palette.textColor}}>
                  GPIO#
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {
                newArr.map(([left, right], key) => {

                  let borderRadius = null;
                  if (left[`number`] === 1) {
                    borderRadius = `0`;
                  } else {
                    borderRadius = `25px`;
                  }
                  return (
                    <TableRow key={key}>
                      <TableRowColumn key={{key}} style={{width: `19px`}}>
                        <h2>{left[`gpio`]}</h2>
                      </TableRowColumn>
                      <TableRowColumn key={key} style={{width: `60px`, paddingLeft: `14px`}}>
                        <div>{left[`name`]}</div>
                        <div>{left[`desc`]}</div>
                      </TableRowColumn>
                      <TableRowColumn key={key} style={{width: `5px`, textOverflow: `auto`, padding: `0 16px`}}>
                        <div style={{
                          display: `inline-block`,
                          transform: `rotate(270deg)`
                        }}>
                          <b>{left[`number`]}</b>
                        </div>
                      </TableRowColumn>
                      <TableRowColumn
                        style={{width: `80px`, padding: `0 0 0 3px`, backgroundColor: MyTheme.palette.borderColor}}>
                        <div style={{
                          width: `30px`,
                          height: `30px`,
                          borderRadius: borderRadius,
                          border: `1px solid ${MyTheme.palette.textColor}`,
                          margin: `5px`,
                          backgroundColor: left[`backgroundColor`],
                          float: `left`
                        }}>
                          <div style={{
                            width: `16px`,
                            height: `16px`,
                            borderRadius: `25px`,
                            border: `1px solid ${MyTheme.palette.textColor}`,
                            margin: `5.8px 0 0 6px`,
                            backgroundColor: MyTheme.palette.canvasColor,
                          }}>
                          </div>
                        </div>
                        <div style={{
                          width: `30px`,
                          height: `30px`,
                          borderRadius: `25px`,
                          border: `1px solid ${MyTheme.palette.textColor}`,
                          margin: `5px`,
                          backgroundColor: right[`backgroundColor`],
                          float: `left`
                        }}>
                          <div style={{
                            width: `16px`,
                            height: `16px`,
                            borderRadius: `25px`,
                            border: `1px solid ${MyTheme.palette.textColor}`,
                            margin: `5.8px 0 0 6px`,
                            backgroundColor: MyTheme.palette.canvasColor,
                          }}>
                          </div>
                        </div>
                      </TableRowColumn>
                      <TableRowColumn key={key} style={{width: `5px`, textOverflow: `auto`}}>
                          <div style={{
                            display: `inline-block`,
                            transform: `rotate(90deg)`
                          }}>
                            <b>{right[`number`]}</b>
                          </div>
                      </TableRowColumn>
                      <TableRowColumn key={key} style={{width: `52px`, overflow: `display`}}>
                        <div>{right[`name`]}</div>
                        <div>{right[`desc`]}</div>
                      </TableRowColumn>
                      <TableRowColumn key={key} style={{width: `21px`}}>
                        <h2>{right[`gpio`]}</h2>
                      </TableRowColumn>
                    </TableRow>
                  );
                })
              }
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}






