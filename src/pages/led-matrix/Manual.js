import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import LedTable from './LedTable.js';
import scssVariables from '../../scssVariables';
import Hint from '../../components/common/Hint/Hint';

export default class Manual extends React.Component {
  render() {
    return (
      <div style={{width: scssVariables.width, paddingTop: `50px`}}>
        <GridList cols={2} cellHeight={450}>
          <GridTile>
            <div style={{textAlign: `right`, padding: `35px`}}>
              <Hint arrowDirection='right'>Click here!</Hint>
            </div>
          </GridTile>
          <GridTile><LedTable/></GridTile>
        </GridList>
      </div>
    );
  }
}
