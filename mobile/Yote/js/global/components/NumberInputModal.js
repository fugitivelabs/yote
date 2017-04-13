// import primary components
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import utilities
import _ from 'lodash';
import labelUtils from '../util/labelUtils';

// import RN components
import Modal from 'Modal';
import KeyboardAvoidingView from 'KeyboardAvoidingView';
import StyleSheet from 'StyleSheet';
import Text from 'Text';
import TextInput from 'TextInput';
import TouchableHighlight from 'TouchableHighlight';
import TouchableOpacity from 'TouchableOpacity';
import View from 'View';

// import custom comonents
import Base from './BaseComponent.js';
import YTButton from './YTButton.js';

//import styles;
import YTColors from '../styles/YTColors';
import YTFormStyles from '../styles/YTFormStyles';
import YTMainStyles from '../styles/YTMainStyles';
import YTModalStyles from '../styles/YTModalStyles';

class NumberInputModal extends Base {
  constructor(props) {
    super(props);
    this.state = {
      theVal: this.props.value ? this.props.value : ''
      , original: "0"
    };
    this._bind(
      '_handleInputChange'
      , '_handleInputBlur'
      , '_handleInputFocus'
      , '_handleSubmit'
    );
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.value !== this.state.theVal) {
      var val = nextProps.value;
      this.setState({theVal: val});
    }
  }
  _handleInputChange(e) {
    let newValue = e.nativeEvent.text;
    this.setState({theVal: newValue});
  }

  _handleSubmit() {
    this.props.save(this.state.theVal);
  }

  _handleInputBlur(e, target) {
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

  render() {
    const { value, name, label, helpText, modalOpen, closeModal, modalHeader, instructions } = this.props;

    return (
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
            <View style={YTFormStyles.inputContainer}>
              <Text style={[YTFormStyles.label, {textAlign: 'right'}]}>{label}</Text>
              <TextInput
                ref={name}
                isRequired={false}
                blurOnSubmit={false}
                autoFocus={false}
                style={[YTFormStyles.input, {textAlign: 'right'}]}
                onFocus={ (e) => this._handleInputFocus(e, "theVal")}
                onBlur={ (e) => this._handleInputBlur(e, "theVal")}
                keyboardType="numeric"
                returnKeyType="done"
                onChange={(e) => this._handleInputChange(e, "theVal")}
                value={this.state.theVal.toString()}
                placeholder=""
                placeholderTextColor={YTColors.lightText}
                selectTextOnFocus={false}
              />
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

NumberInputModal.propTypes = {
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

export default NumberInputModal;
