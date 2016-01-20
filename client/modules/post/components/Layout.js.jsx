import React from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import Post from "../PostHandler";


export default class PostLayout extends Base {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("render post layout");
    return (
      <div> 
        {this.props.children}
      </div>
    )
  }
}

