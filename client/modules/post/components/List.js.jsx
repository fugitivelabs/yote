import React, { Component, PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';
import { Link } from 'react-router';

// import actions
import * as listActions from '../actions/list';

// import components
import ListItem from './ListItem.js.jsx';

class List extends Base {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    console.log("list mounting");

    this.props.dispatch(listActions.fetchList()).then(() => {
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
      <div className="yt-container">
        <h1> Post List
          <Link className="yt-btn small u-pullRight" to={'/posts/new'}> NEW POST </Link>
        </h1>
        <hr/>
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
  console.log("list state");
  console.log(state);
  const { post } = state;
  const list = post.list;
  return {
    list: list
  }
}

export default connect(
  mapStateToProps
)(List);
