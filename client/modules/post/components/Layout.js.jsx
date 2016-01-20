import React from 'react';
import Post from "../PostHandler";


export default class PostLayout extends React.Component{
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
