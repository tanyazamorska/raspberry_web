import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import LedTable from './../LedTable.js';
import scssVariables from '../../../scssVariables';
import Hint from '../../../components/common/Hint/Hint';

export default class Manual extends React.Component {

  onLedClick = (ledState, rowI, cellI) => {
    const newMatrix = ledState.matrix;
    newMatrix[rowI][cellI] = !newMatrix[rowI][cellI];
    this.setState({matrix: newMatrix});
  };

  render() {
    return (
      <div style={{width: scssVariables.width}}>
        <GridList cols={2} cellHeight={450}>
          <GridTile>
            <div style={{textAlign: `right`}}>
              <Hint arrowDirection='right'>Click here!</Hint>
            </div>
          </GridTile>
          <GridTile><LedTable onLedClick={this.onLedClick}/></GridTile>
        </GridList>
      </div>
    );
  }
}
