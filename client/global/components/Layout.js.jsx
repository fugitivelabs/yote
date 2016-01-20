import React from 'react';
import Base from './BaseComponent.js.jsx';

export default class Layout extends Base {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div> 
        {this.props.children}
      </div>
    )
  }
}
