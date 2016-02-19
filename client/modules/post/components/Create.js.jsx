import React, { Component, PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';

// import actions
import * as singleActions from '../actions/single';


// import components
import PostForm from './PostForm.js.jsx';

class Create extends Base {
  constructor(props) {
    super(props);
    this.state = this.props;
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(singleActions.setupNewPost())
    // this.props.dispatch(singleActions.setupNewPost()).then(() =>{
    //     console.log(this.props);
    //   });
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
    // console.log("NExt PROPs");
    // console.log(nextProps);
    if(nextProps.status === "error") {
      alert(nextProps.error.message);
    }
  }

  _handleFormChange(e) {
    //this works WAY better than having a separate onChange for every input box
    // just make sure input name attr == state name
    var newPostState = this.state.item;
    newPostState[e.target.name] = e.target.value;
    this.setState(newPostState);
    // console.log("_handleFormChange");
    // console.log(e);
    // this.props.item[e.target.name] = e.target.value;
  }

  _handleFormSubmit(e) {
    e.preventDefault();
    console.log("_handleFormSubmit");
    // console.log(e);
    this.props.dispatch(singleActions.sendCreatePost(this.state.item));
  }

  render() {
    const { item } = this.state;
    const isEmpty = !item;
    return  (
      <div>

        {isEmpty
          ? <h2> Loading...</h2>
        : <PostForm
            post={item}
            formType="create"
            handleFormSubmit={this._handleFormSubmit}
            handleFormChange={this._handleFormChange}
            cancelLink="/posts"
            formTitle="Create Post"
            />
        }
      </div>
    )
  }
}

Create.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  // console.log("State");
  // console.log(state);
  return {
    item: state.post.single.item
    , status: state.post.single.status
  }
}

export default connect(
  mapStateToProps
)(Create);
