import React, { Component, PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import * as crudAction from '../actions/crudActions';
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
    this.props.dispatch(crudAction.fetchList()).then(() => {
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
    const { news } = this.props;
    const isEmpty = news.items.length === 0;
    return(
      <div>
        <h1> News List </h1>
          {isEmpty
            ? (news.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
            : <div style={{ opacity: news.isFetching ? 0.5 : 1 }}>
              <ul>
                {news.items.map((item, i) =>
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
  return {
    news: news.CRUD.list
  }
}




export default connect(
  mapStateToProps
)(List);
