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
          <GridTile containerElement={<Hint text='Click on the circle!' top='40px' left='300px'/>}/>
          <GridTile containerElement={<LedTable/>}/>
        </GridList>
      </div>
    );
  }
}
