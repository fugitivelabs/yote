import React from 'react';
import Base from "../BaseComponent.js.jsx";
import classNames from 'classnames';



class RadioInput extends Base {
  //
  // <RadioInput
  //   label="Leaderboard Sort Order"
  //   options={[
  //     {val: 'descending', display: 'Sort Descending'},
  //     {val: 'ascending', display: 'Sort Ascending'},
  //   ]}
  //   name="sortOrder"
  //   value={item.sortOrder}
  //   change={handleFormChange}
  //   inLine={true}
  // />
  constructor(props) {
    super(props);
    this.state = {
      selected: props.value || null
    }
    this._bind(
      '_handleSelectChange'

    )
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.value != nextProps.value) {
      this.setState({selected: nextProps.value});
    }
  }

  _handleSelectChange(e) {
    // console.log("_handleSelectChange");
    // console.log(e.target.name, e.target.value, e.target.checked);
    this.props.change(e);
  }

  render() {
    const { options, label, name, selected, inLine } = this.props;

    const inputClass = classNames(
      'radio-input'
      , { 'inline': inLine }
    )

    var theOptions = options.map((option, i) => {
      var isChecked = option.val === this.state.selected ? true : false;
      return(
        <div key={i} className={inputClass}>
          <input
            type="radio"
            name={name}
            value={option.val}
            onChange={this._handleSelectChange}
            checked={isChecked}
          />
          <span htmlFor={name} className="display">{option.display}</span>
        </div>
      )
    })
    return(
      <div className="input-group">
        <label htmlFor={name}>{label}</label>
        {theOptions}
      </div>
    )
  }

}

RadioInput.propTypes = {
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
              val: React.PropTypes.oneOfType([
                          React.PropTypes.string
                          , React.PropTypes.number
                        ]).isRequired
              , display: React.PropTypes.string.isRequired
            })).isRequired
  , change: React.PropTypes.func.isRequired
  , value: React.PropTypes.any
  , label: React.PropTypes.string
  , name: React.PropTypes.string
}

export default RadioInput;
