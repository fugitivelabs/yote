import React, { Component, PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';

// import actions
import * as singleActions from '../actions/single';
// import * as updateActions from '../actions/update';

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
    const { dispatch } = this.props;
    dispatch(singleActions.setupNewPost())
    // this.props.dispatch(singleActions.setupNewPost()).then(() =>{
    //     console.log(this.props);
    //   });
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
    // console.log("_handleFormChange");
    // console.log(e);
  }

  render() {
    const { item } = this.state;
    const isEmpty = !item;
    return  (
      <div>
        <h3> Create News Item </h3>
        {isEmpty
          ? <h2> Loading...</h2>
          : <NewsForm
            post={item}
            formType="create"
            handleFormSubmit={this._handleFormSubmit}
            handleFormChange={this._handleFormChange}
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
