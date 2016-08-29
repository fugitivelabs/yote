import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';
import _ from 'lodash';

// import actions
import { singleActions as postSingleActions } from '../actions';
import { listActions as userListActions } from '../../user/actions';

// import components
import PostForm from './PostForm.js.jsx';

class CreatePost extends Base {
  constructor(props) {
    super(props);
    this.state = this.props;
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(postSingleActions.setupNewPost());
    dispatch(userListActions.fetchList());
    // this.props.dispatch(postSingleActions.setupNewPost()).then(() =>{
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
    var newState = _.update( this.state.item, e.target.name, function() {
      return e.target.value;
    });
    this.setState(newState);
  }

  _handleFormSubmit(e) {
    e.preventDefault();
    // console.log("_handleFormSubmit");
    // console.log(e);
    this.props.dispatch(postSingleActions.sendCreatePost(this.state.item));
  }

  render() {
    const { item, users } = this.state;
    const isEmpty = !item;
    return  (
      <div>

        {isEmpty
          ? <h2> Loading...</h2>
            : <PostForm
              post={item}
              users={users}
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

CreatePost.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  // console.log("State");
  // console.log(state);
  return {
    item: store.post.single.item
    , status: store.post.single.status
    , users: store.user.list.items
  }
}

export default connect(
  mapStoreToProps
)(CreatePost);
