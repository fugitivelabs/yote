import React from 'react';

class Layout extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    console.log("render layout");
    return (
      <div> 
        {this.props.children}
      </div>
    )
  }
}

export default Layout;