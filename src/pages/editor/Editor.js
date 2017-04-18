import React from 'react';
import AppBar from 'material-ui/AppBar';
import AceEditor from 'react-ace';
import $ from 'jquery';
import 'brace/mode/javascript';
import 'brace/theme/github';
import RaisedButton from 'material-ui/RaisedButton';
import theme from 'material-ui/styles/baseThemes/lightBaseTheme';
import * as variables from '../../variables.js';

function onChange(newValue) {
  console.log(newValue)
}
/**
 * reads data from server file
 * @param path - path to file on server
 * @param callback - function that will be executed on response received from server
 */
function getFileContents(path, callback) {
  $.ajax({
    method: "POST",
    url: "http://192.168.0.103:7777/api/fs/cat",
    data: JSON.stringify({"path": path}),
    contentType: 'application/json',
    complete: function (res) {
      callback(res.responseJSON);
    }
  });
}

// save(path, "contents a123 123 123 123 ")
function save(path, contents, callback) {
  $.ajax({
    method: "POST",
    url: "http://192.168.0.103:7777/api/fs/echo",
    data: JSON.stringify({"path": path, "contents": contents}),
    contentType: 'application/json',
    complete: function (res) {
      if (callback) {
        callback(res.responseJSON);
      }
    }
  });
}

export default class Editor extends React.Component {
  componentWillMount() {
    const self = this
    self.state = {contents: ""}
    const path = "/" + this.props.params.splat;
    getFileContents(path, data => {
      self.setState({contents: data});
    });
  }

  render() {
    console.log("render");
    return (
      <div>
        <AppBar
          showMenuIconButton={false}
          style={{width: variables.default.width, backgroundColor: theme.palette.accent1Color}}
          title={this.props.params.splat}
          iconElementRight={<RaisedButton label="Save" style={{margin: "6px 12px"}}/>}
        />
        <div style={{width: variables.default.width}}>
          <AceEditor
            mode="javascript"
            theme="github"
            onChange={onChange}
            name="K-EDITOR"
            editorProps={{$blockScrolling: true}}
            width={variables.default.width}
            fontSize="14px"
            value={this.state.contents}
          />
        </div>
      </div>
    )
  }
}

