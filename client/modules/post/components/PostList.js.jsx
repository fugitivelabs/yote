import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';
import { Link } from 'react-router';

// import actions
import { listActions }from '../actions';

// import components
import PostListItem from './PostListItem.js.jsx';

class PostList extends Base {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    // console.log("list mounting");
    // console.log(this.props);
    this.props.dispatch(listActions.fetchListIfNeeded("all"));
  }
  //
  componentWillReceiveProps(nextProps) {
    // console.log("nextProps");
    // console.log(nextProps);
    // if(nextProps.selectedItem !== this.props.selectedItem) {
    //   const { dispatch, selectedItem } = nextProps;
    // }
  }

  render() {
    const { list } = this.props;
    const isEmpty = list.all.length === 0;
    return(
      <div className="flex ">
        <section className="section ">
          <div className="yt-container">
            <h1> Post List
              <Link className="yt-btn small u-pullRight" to={'/posts/new'}> NEW POST </Link>
            </h1>
            <hr/>
            {isEmpty
              ? (list.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
                : <div style={{ opacity: list.isFetching ? 0.5 : 1 }}>
                  <ul>
                    {list.all.map((item, i) =>
                      <PostListItem key={i} post={item} />
                    )}
                  </ul>
                </div>
            }
          </div>
        </section>
      </div>
    )

  }
}


PostList.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  return {
    list: store.post.list
  }
}

export default connect(
  mapStoreToProps
)(PostList);
