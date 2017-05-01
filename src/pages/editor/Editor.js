import React from 'react';
import AppBar from 'material-ui/AppBar';
import AceEditor from 'react-ace';
import $ from 'jquery';
import 'brace/mode/javascript';
import 'brace/mode/java';
import 'brace/mode/sass';
import 'brace/mode/python';
import 'brace/mode/xml';
import 'brace/mode/mysql';
import 'brace/mode/json';
import 'brace/mode/html';
import 'brace/mode/coffee';
import 'brace/mode/css';
import 'brace/mode/handlebars';
import 'brace/mode/csharp';
import 'brace/mode/golang';
import 'brace/mode/markdown';
import 'brace/theme/github';
import RaisedButton from 'material-ui/RaisedButton';
import MyTheme from '../../MyTheme';
import scssVariables from '../../scssVariables';
import variables from '../../variables';
import Notification from '../../components/common/Notification/Notification'

/**
 * reads data from server file
 * @param path - path to file on server
 * @param callback - function that will be executed on response received from server
 */
function getFileContents(path, callback) {
  $.ajax({
    method: "POST",
    url: variables.url + "cat",
    data: JSON.stringify({"path": path}),
    contentType: 'application/json',
    complete: function (res) {
      callback(res.responseJSON);
    }
  });
}

function save(path, contents, callback) {
  $.ajax({
    method: "POST",
    url: variables.url + "echo",
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
    const self = this;
    self.state = {contents: ""};
    const path = "/" + this.props.params.splat;
    getFileContents(path, data => {
      self.setState({contents: data});
    });
  }

  render() {
    const str = this.props.params.splat;
    const dot = str.lastIndexOf('.');
    const fileExtension = str.slice(dot + 1);
    let mode = '';
    if (fileExtension === 'js') {
      mode = 'javascript';
    } else if (fileExtension === 'java') {
      mode = 'java';
    } else if (fileExtension === 'sass') {
      mode = 'sass';
    } else if (fileExtension === 'py') {
      mode = 'python';
    } else if (fileExtension === 'xml') {
      mode = 'xml';
    } else if (fileExtension === 'rb') {
      mode = 'ruby';
    } else if (fileExtension === 'mysql') {
      mode = 'mysql';
    } else if (fileExtension === 'json') {
      mode = 'json';
    } else if (fileExtension === 'html') {
      mode = 'html';
    } else if (fileExtension === 'coffee') {
      mode = 'coffee';
    } else if (fileExtension === 'css') {
      mode = 'css';
    } else if (fileExtension === 'handlebars') {
      mode = 'handlebars';
    } else if (fileExtension === 'cs') {
      mode = 'csharp';
    } else if (fileExtension === 'golang') {
      mode = 'go';
    } else {
      mode = 'markdown';
    }
    const self = this;
    const pathSave = '/' + this.props.params.splat;

    return (
      <div>
        <Notification/>
        <AppBar
          showMenuIconButton={false}
          style={{width: scssVariables.width, backgroundColor: MyTheme.palette.primary2Color}}
          title={this.props.params.splat}
          iconElementRight={<RaisedButton label="Save" style={{margin: "6px 12px"}}
                                          onClick={() => save(pathSave, this.state.contents, () => {
                                           Notification.show({level: "error", text: 'File Saved'})})
                                          }/>}
        />
        <div style={{width: scssVariables.width}}>
          <AceEditor
            mode={mode}
            theme="github"
            onChange={newValue => self.setState({contents: newValue})}
            name="K-EDITOR"
            editorProps={{$blockScrolling: true}}
            width={scssVariables.width}
            fontSize="16px"
            value={this.state.contents}
          />
        </div>
      </div>
    )
  }
}


