// import primary components
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import utilities
import _ from 'lodash';
import labelUtils from '../util/labelUtils';

// import RN components
import KeyboardAvoidingView from 'KeyboardAvoidingView';
import Modal from 'Modal';
import StyleSheet from 'StyleSheet';
import Text from 'Text';
import TextInput from 'TextInput';
import TouchableHighlight from 'TouchableHighlight';
import TouchableOpacity from 'TouchableOpacity';
import View from 'View';

// import global comonents
import Base from './BaseComponent.js';
import YTButton from './YTButton.js';

//import styles;
import YTColors from '../styles/YTColors';
import YTFormStyles from '../styles/YTFormStyles';
import YTMainStyles from '../styles/YTMainStyles';
import YTModalStyles from '../styles/YTModalStyles';

class TimeInputModal extends Base {

  /**
  *
  *  This should accept milliseconds and convert to display:
  *  00:00:00.00
  *  hh:mm:ss.ms
  *
  **/

  constructor(props) {
    super(props);
    this.state = {
      formattedTime: "00:00:00.00"
      , hours: "0"
      , minutes: "0"
      , seconds: "0"
      , milliseconds: "0"

      , time: "0"
      , original: "0"
    }
    this._bind(
      '_handleTimeInputChange'
      , '_handleInputBlur'
      , '_handleInputFocus'
      , '_handleSubmit'
    )
  }

  componentDidMount() {
    this._initTimeFromProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._initTimeFromProps(nextProps);
  }

  _initTimeFromProps(props) {
    // console.log(props.value, '-vs-', this.state.time);
    if(parseInt(props.value) !== parseInt(this.state.time)) {
      // console.log("new val.  do something");
      var duration = parseInt(props.value);
      // console.log(parseInt(duration%1000));
      var milliseconds = parseInt((duration%1000)/10)
          , seconds = parseInt((duration/1000)%60)
          , minutes = parseInt((duration/(1000*60))%60)
          , hours = parseInt((duration/(1000*60*60)));

      var fHours = (hours < 10) ? "0" + hours : hours;
      var fMinutes = (minutes < 10) ? "0" + minutes : minutes;
      var fSeconds = (seconds < 10) ? "0" + seconds : seconds;
      var fMilliseconds = milliseconds;

      // console.log(fHours + ":" + fMinutes + ":" + fSeconds + "." + fMilliseconds);
      var formattedTime = fHours + ":" + fMinutes + ":" + fSeconds + "." + milliseconds;
      this.setState({
        formattedTime
        , hours: hours.toString()
        , minutes: minutes.toString()
        , seconds: seconds.toString()
        , milliseconds: milliseconds.toString()
        , time: props.value.toString()
      });
    }
  }

  _handleTimeInputChange(e, target) {
    if(e.nativeEvent.text.length <=2 ){
      let newVal;
      if(target === "milliseconds" && parseInt(e.nativeEvent.text) > 99) {
        newVal = "99";
      } else if((target === "seconds" || target === "minutes") && parseInt(e.nativeEvent.text) > 59) {
        newVal = "59";
      } else {
        newVal = e.nativeEvent.text;
      }
      var newState = _.update( this.state, target, function() {
        return newVal;
      });

      var fHours = (newState.hours < 10) ? "0" + newState.hours : newState.hours;
      var fMinutes = (newState.minutes < 10) ? "0" + newState.minutes : newState.minutes;
      var fSeconds = (newState.seconds < 10) ? "0" + newState.seconds : newState.seconds;
      var formattedTime = fHours + ":" + fMinutes + ":" + fSeconds + "." + newState.milliseconds;

      newState.formattedTime = formattedTime;

      var newMs = newState.milliseconds ? parseInt(newState.milliseconds) * 10: 0 ;
      var secInMs = newState.seconds ? parseInt(newState.seconds) * 1000 : 0;
      var minInMs = newState.minutes ? parseInt(newState.minutes) * 60 * 1000 : 0;
      var hrInMs = newState.hours ? parseInt(newState.hours) * 60 * 60 * 1000 : 0;
      var newTime = secInMs+ newMs + minInMs + hrInMs;
      // console.log(newTime);
      newState.time = newTime.toString();
      // console.log('newState');
      // console.log(newState);
      this.setState(newState);

    } else {
      // do nothing
    }
  }

  _handleInputBlur(e, target) {
    // console.log("_handleInputBlur");
    if(this.props.clearOnFocus) {
      // reset to original value if blank
      if(e.nativeEvent.text && e.nativeEvent.text.length <=2 ){
        // console.log("target acquired");
        var newState = _.update( this.state, target, () => {
          if(e.nativeEvent.text === '') {
            return this.state.original;
          } else {
            return e.nativeEvent.text;
          }
        });
        this.setState(newState);
      }
    } else {
      // do nothing
    }
  }

  _handleInputFocus(e, target) {
    if(this.props.clearOnFocus) {
      // console.log("clear on Focus");
      var newState = _.update( this.state, target, function() {
        return '';
      });
      newState.original = e.nativeEvent.text;
      // put this in a timeout function to fire afte the component receives props from a blur event triggered by an adjacent component
      setTimeout(() => {
        this.setState(newState)
      }, 50);
    }
  }

  _handleSubmit() {
    this.props.save(this.state.time);
  }

  render() {
    const { value, name, label, helpText, modalOpen, closeModal, modalHeader, instructions } = this.props;
    const { formattedTime, hours, minutes, seconds, milliseconds, time } = this.state;
    // console.log("time input val", value);

    return(
      <Modal animationType="fade" visible={modalOpen} transparent={true} onRequestClose={() => null}>
        <KeyboardAvoidingView behavior="padding" style={YTModalStyles.modalContainer}>
          <View style={YTModalStyles.modalContent}>
            {modalHeader ?
              <View style={YTModalStyles.modalHeader}>
                {modalHeader}
              </View>
              :
              null
            }
            {instructions ?
              <View style={YTModalStyles.modalInstructions}>
                <Text style={YTModalStyles.instructions}>{instructions}</Text>
              </View>
              : null
            }
            <View style={YTFormStyles.inlineInput}>
              <View style={YTFormStyles.quarterInput}>
                <View style={YTFormStyles.inputContainer}>
                  <Text style={[YTFormStyles.label, {textAlign: 'center'}]}>Hours</Text>
                  <TextInput
                    ref={"hours"}
                    isRequired={false}
                    blurOnSubmit={false}
                    autoFocus={false}
                    style={[YTFormStyles.input, YTFormStyles.numberInput]}
                    onFocus={ (e) => this._handleInputFocus(e, "hours")}
                    onBlur={ (e) => this._handleInputBlur(e, "hours")}
                    keyboardType="numeric"
                    returnKeyType="done"
                    onChange={(e) => this._handleTimeInputChange(e, "hours")}
                    value={this.state.hours}
                    placeholder=""
                    placeholderTextColor={YTColors.lightText}
                    selectTextOnFocus={false}
                  />
                </View>
              </View>
              <View style={YTFormStyles.quarterInput}>
                <View style={YTFormStyles.inputContainer}>
                  <Text style={[YTFormStyles.label, {textAlign: 'center'}]}>Minutes</Text>
                  <TextInput
                    ref={"minutes"}
                    isRequired={false}
                    blurOnSubmit={false}
                    autoFocus={false}
                    style={[YTFormStyles.input, YTFormStyles.numberInput]}
                    onFocus={ (e) => this._handleInputFocus(e, "minutes")}
                    onBlur={ (e) => this._handleInputBlur(e, "minutes")}
                    keyboardType="numeric"
                    returnKeyType="done"
                    onChange={(e) => this._handleTimeInputChange(e, "minutes")}
                    value={this.state.minutes}
                    placeholder={label}
                    placeholderTextColor={YTColors.lightText}
                    selectTextOnFocus={false}
                  />
                </View>
              </View>
              <View style={YTFormStyles.quarterInput}>
                <View style={YTFormStyles.inputContainer}>
                  <Text style={[YTFormStyles.label, {textAlign: 'center'}]}>Seconds</Text>
                  <TextInput
                    ref={"seconds"}
                    isRequired={false}
                    blurOnSubmit={false}
                    autoFocus={false}
                    style={[YTFormStyles.input, YTFormStyles.numberInput]}
                    onFocus={ (e) => this._handleInputFocus(e, "seconds")}
                    onBlur={ (e) => this._handleInputBlur(e, "seconds")}
                    keyboardType="numeric"
                    returnKeyType="done"
                    onChange={(e) => this._handleTimeInputChange(e, "seconds")}
                    value={this.state.seconds}
                    placeholder={label}
                    placeholderTextColor={YTColors.lightText}
                    selectTextOnFocus={false}
                  />
                </View>
              </View>
              <View style={YTFormStyles.quarterInput}>
                <View style={YTFormStyles.inputContainer}>
                  <Text style={[YTFormStyles.label, {textAlign: 'center'}]}>Tenths</Text>
                  <TextInput
                    ref={"milliseconds"}
                    isRequired={false}
                    blurOnSubmit={false}
                    autoFocus={false}
                    style={[YTFormStyles.input, YTFormStyles.numberInput]}
                    onFocus={ (e) => this._handleInputFocus(e, "milliseconds")}
                    onBlur={ (e) => this._handleInputBlur(e, "milliseconds")}
                    keyboardType="numeric"
                    returnKeyType="done"
                    onChange={(e) => this._handleTimeInputChange(e, "milliseconds")}
                    value={this.state.milliseconds}
                    placeholder={label}
                    placeholderTextColor={YTColors.lightText}
                    selectTextOnFocus={false}
                  />
                </View>
              </View>
            </View>
            <YTButton
              onPress={this._handleSubmit}
              style={YTFormStyles.submitButton}
              caption="Save & Close"
            />
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity
         onPress={() => closeModal()}
         style={YTModalStyles.modalCloseButton}>
         <Text style={YTModalStyles.modalCloseText}>CANCEL</Text>
       </TouchableOpacity>
      </Modal>
    )
  }
}

TimeInputModal.propTypes = {
  label: PropTypes.string
  , value: PropTypes.number.isRequired
  , name: PropTypes.string
  , required: PropTypes.bool
  , save: PropTypes.func.isRequired
  , blur: PropTypes.func
  , focus: PropTypes.func
  , disabled: PropTypes.bool
  , helpText: PropTypes.string
  , clearOnFocus: PropTypes.bool
  , closeModal: PropTypes.func.isRequired
  , modalOpen: PropTypes.bool
}

export default TimeInputModal;
