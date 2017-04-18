import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  border: '10px',
  boxSizing: 'border-box',
  display: 'inline-block',
  fontFamily: 'Roboto, sansSerif',
  //-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  cursor: 'pointer',
  textDecoration: 'none',
  margin: '0px',
  padding: '0px',
  outline: 'none',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  position: 'relative',
  zIndex: 1,
  height:  '36px',
  lineHeight: '36px',
  width: '100%',
  bordeRadius: '2px',
  transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
  backgroundColor: 'rgb(0, 188, 212)',
  textAlign: 'center'
};


export default class FileUpload extends React.Component {
  render() {
    return (
      <div>
        <input type="file" style={style}/>
        <RaisedButton primary={true} label="Upload" />
      </div>
    )
  }
}

