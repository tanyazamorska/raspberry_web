import React from 'react';
import AppBar from 'material-ui/AppBar';
import AceEditor from 'react-ace';
import $ from 'jquery';
import 'brace/mode/javascript';
import 'brace/theme/github';
import RaisedButton from 'material-ui/RaisedButton';
import theme from 'material-ui/styles/baseThemes/lightBaseTheme';
import scssVariables from '../../scssVariables';
import variables from '../../variables';

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
    url:  variables.url + "echo",
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
    const self = this;
    const pathSave = '/' + this.props.params.splat;
    return (
      <div>
        <AppBar
          showMenuIconButton={false}
          style={{width: scssVariables.width, backgroundColor: theme.palette.accent1Color}}
          title={this.props.params.splat}
          iconElementRight={<RaisedButton label="Save" style={{margin: "6px 12px"}}
                                          onClick={() => save(pathSave, this.state.contents, () => {})}/>}
        />
        <div style={{width: scssVariables.width}}>
          <AceEditor
            mode="javascript"
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

