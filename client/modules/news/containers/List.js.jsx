import React, { Component, PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import * as listActions from '../actions/list';
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
    this.props.dispatch(listActions.fetchList()).then(() => {
      // console.log("State after fetch:")
      // console.log(getState())
      // console.log(this.context.store.getState());
      // console.log(this.props);
    })
  }
  //
  // componentWillReceiveProps(nextProps) {
  //   if(nextProps.selectedItem !== this.props.selectedItem) {
  //     const { dispatch, selectedItem } = nextProps;
  //   }
  // }

  render() {
    const { list } = this.props;
    const isEmpty = list.items.length === 0;
    return(
      <div>
        <h1> News List </h1>
          {isEmpty
            ? (list.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
            : <div style={{ opacity: list.isFetching ? 0.5 : 1 }}>
              <ul>
                {list.items.map((item, i) =>
                  <ListItem key={i} post={item} />
                )}
              </ul>

            </div>
          }

      </div>
    )
  }
}


List.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps");
  console.log(state);
  const { news } = state;
  const list = news.list;
  // list.visibilityFilter = state.news.customReducers.setVisibilityFilter;
  return {
    list: list
  }
}




export default connect(
  mapStateToProps
)(List);
