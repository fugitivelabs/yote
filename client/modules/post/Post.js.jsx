import React from 'react';

class Post extends React.Component{
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

export default Post;