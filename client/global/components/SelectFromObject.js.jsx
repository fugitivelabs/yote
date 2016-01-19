import React from 'react';

import Base from "../../../global/components/BaseComponent.js.jsx";

class SelectFromObject extends Base{

  constructor(props, context) {
    super(props);

  }

  render() {
    return(
      <div className="select-from-object">
        <select>
          <option> </option>
        </select>
      </div>
    )
  }

}

SelectFromObject.propTypes = {
  objects: React.PropTypes.
}

SelectFromObject.defaultProps = {

}

export default SelectFromObject;