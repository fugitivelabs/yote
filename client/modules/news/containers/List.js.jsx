import React, { Component, PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import * as action from '../actions';
import { connect } from 'react-redux';


import ListItem from '../components/ListItem.js.jsx';

class List extends Base {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    console.log("list mounting");
    // console.log(this.context);

    // action.fetchList();
    this.props.dispatch(action.fetchList()).then(() => {
      console.log("State after fetch:")
      // console.log(getState())
      // console.log(this.context.store.getState());
      console.log(this.props);
    })
  }
  //
  // componentWillReceiveProps(nextProps) {
  //   if(nextProps.selectedItem !== this.props.selectedItem) {
  //     const { dispatch, selectedItem } = nextProps;
  //   }
  // }

  render() {
    // const { selectedItem, news, isFetching, lastUpdated } = this.props;
    // const isEmtpy = news.length === 0;
    return(
      <div>
        <h1> News List </h1>
          <ul>
          {this.props.news.items.map((item, i) =>
            <ListItem key={i} post={item} />
          )}
        </ul>
      </div>
    )
  }
}


List.propTypes = {
  list: PropTypes.array
  , isFetching: PropTypes.bool
  , dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps");
  console.log(state);
  const { news } = state;
  return {
    news: news.list
  }
}




export default connect(
  mapStateToProps
)(List);
