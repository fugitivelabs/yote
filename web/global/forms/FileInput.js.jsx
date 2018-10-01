/**
 * Helper component for rendering and handling file inputs
 *
 * NOTE: This is a 'fork' of the old 'react-file-input' repo, which is no
 * longer maintained. We will probably continue to iterate on this.
 * See other projects (sof) for examples of integrating on the server side.
 *
 * TODO: Needs to be rewritten
 */


import React from 'react';
import PropTypes from 'prop-types';

// import components
import Binder from '../Binder.js.jsx';

class FileInput extends Binder {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || ""
      , styles: {
        parent: {
          position: 'relative'
          , zIndex: 0
        }
        , file: {
          position: 'absolute'
          , top: 0
          , left: 0
          , opacity: 0
          , width: '100%'
          , zIndex: 1
        }
        , text: {
          position: 'relative'
          , zIndex: -1
        }
      }
    }
    this._bind(
      '_handleInputChange'
    )
  }

  _handleInputChange(e) {
    this.setState({
      value: e.target.value.split(/(\\|\/)/g).pop()
    });
    if (this.props.change) {
      this.props.change(e);
    }
  }

  render() {
    return(
      <div style={this.state.styles.parent}>
        <input
          accept={this.props.accept}
          className={this.props.className}
          disabled={this.props.disabled}
          multiple={this.props.multiple}
          name={this.props.name}
          onChange={this._handleInputChange}
          style={this.state.styles.file}
          type="file"
        />
        <input
          className={this.props.className}
          disabled={this.props.disabled}
          name={this.props.name + '_filename'}
          onChange={() => null}
          placeholder={this.props.placeholder}
          style={this.state.styles.text}
          tabIndex={-1}
          type="text"
          value={this.state.value}
        />
      </div>
    )
  }
}

export default FileInput;
