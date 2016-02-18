import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Base from "../../../global/components/BaseComponent.js.jsx";
import * as Actions from '../postActions'
import New from './New.js.jsx'

class NewContainer extends Base{
  constructor(props) {
    super(props)
    this._bind('_createAction');
  }

  _createAction(event, data) {
    event.preventDefault();
    console.log("CREATE ACTION");
    console.log(data);
    //VALIDATION...

    this.props.dispatch(Actions.sendCreatePost(data));
    //get the values from the synthetic event
    // const post = {};
    // console.log(typeof(e.target));
    // for(var field in e.target) {
    //   // console.log(e.target[target]);
    //   if(e.target[field].name && typeof(e.target[field]) == 'object' ) {
    //     console.log(e.target[field].name);
    //     console.log(e.target[field].value);
    //   }
    // }
  }

  render() {
    return (
      <div>
        <New createAction={this._createAction}/>
      </div>
    )
  }

}

NewContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(NewContainer)
