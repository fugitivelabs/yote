import React, { Component, PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';

// import actions
import * as singleActions from '../actions/single';
import * as updateActions from '../actions/update';

// import components
import NewsForm from '../components/NewsForm.js.jsx';

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
    console.log("Single item mounting");
    // console.log(this.context);

    // action.fetchItem();
    const populate = false;
    // const populate = false;
    const { dispatch, params } = this.props;
    if(params.postId) {
      dispatch(singleActions.fetchSingleNewsItemById(params.postId, populate ))
    } else {
      dispatch(singleActions.fetchSingleNewsItemBySlug(params.slug, populate))
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
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
    this.props.dispatch(updateActions.sendUpdateItem(this.state.item));
  }

  render() {
    const { item } = this.state;
    const isEmpty = !item;
    return  (
      <div >
        {isEmpty
          ? <h2> Loading...</h2>
          : <NewsForm
            post={item}
            formType="update"
            handleFormSubmit={this._handleFormSubmit}
            handleFormChange={this._handleFormChange}
            cancelLink={`/news/${item.slug}`}
            formTitle="Update Post"
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
    item: state.news.single.item
  }
}

export default connect(
  mapStateToProps
)(Create);
