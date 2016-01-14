import React from 'react';
import Post from "../PostHandler";

class Layout extends React.Component{
  constructor(props, context) {
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


export default Layout;