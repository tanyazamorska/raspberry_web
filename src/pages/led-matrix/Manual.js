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
            <div style={{textAlign: `right`, backgroundColor: `grey`}}>
              <Hint arrow-direction='right' style={{color: `red`}} >Connect Led Matrix</Hint>
              <div>
                <div style={{display: `inline-block`, padding: `20px`, backgroundColor: `#a4a4a4`, marginBottom: `10px`}}>
                  Connect Led Matrix
                </div>
              </div>
              <div>
                <div style={{display: `inline-block`, padding: `20px`, backgroundColor: `#a4a4a4`, marginBottom: `10px`}}>
                  Click any led
                </div>
              </div>
              <div>
                <div style={{display: `inline-block`, padding: `20px`, backgroundColor: `#a4a4a4`, marginBottom: `10px`}}>
                  real lead-matrix should have same state as virtual
                </div>
              </div>
            </div>
          </GridTile>
          <GridTile><LedTable/></GridTile>
        </GridList>
      </div>
    );
  }
}