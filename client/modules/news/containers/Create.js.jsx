import React, { Component, PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';

import * as singleActions from '../actions/single';

class Create extends Base {
  constructor(props) {
    super(props);

  }
  componentWillMount() {

  }

  render() {
    return  (
      <div>
        <h3> Create News Item </h3>

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
