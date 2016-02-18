import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Base from "../../../global/components/BaseComponent.js.jsx";
import * as Actions from '../postActions'
import New from './New.js.jsx'

class NewContainer extends Base{
  constructor(props) {
    super(props)
    this._bind('_handleSubmitAction');
  }

  _handleSubmitAction(event, data) {
    event.preventDefault();
    console.log("CREATE ACTION");
    console.log(data);
    //VALIDATION...
    this.props.dispatch(Actions.sendCreatePost(data));
  }

  render() {
    return (
      <div>
        <New createAction={this._handleSubmitAction}/>
      </div>
    )
  }

}

NewContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(NewContainer)
