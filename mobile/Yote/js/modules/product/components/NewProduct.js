// import react things
import React, { PropTypes } from 'react';
import ReactNative from 'react-native';
import Base from '../../../global/components/BaseComponent';
import { connect } from 'react-redux';


// import react-native componentsimport Dimensions from 'Dimensions';
import Platform from 'Platform';
import StyleSheet from 'StyleSheet';
import View from 'View';
import Text from 'Text';
import Image from 'Image';
import ScrollView from 'ScrollView';
import TouchableOpacity from 'TouchableOpacity';
import TextInput from 'TextInput';

// import custom components
import YTTouchable from '../../../global/components/YTTouchable';
import YTButton from '../../../global/components/YTButton';
import YTHeader from '../../../global/components/YTHeader';
// import Scheduler from './Scheduler';

// import libraries
import moment from 'moment';
import _ from 'lodash';



// import actions
import { singleActions } from '../actions';


// import styles
import YTColors from '../../../global/styles/YTColors';

const FILTER_HEIGHT = 30;

const BUTTON_HEIGHT = 32;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: YTColors.primaryHeader,
    // padding: 5
  },

  formWrapper: {
    flex: 1,
    backgroundColor: YTColors.lightBackground,
    padding: 4,
    // , paddingBottom: 50
  },

  cell: {

    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
  },
  infoBox: {
    backgroundColor: 'white',
    paddingLeft: 8,
    paddingRight: 8,
  },
  header: {
    fontSize: 16,
    textAlign: 'center',
    color: "#fff",
    padding: 4,
    backgroundColor: YTColors.lightText,
  },
  instructions: {
    color: YTColors.lightText,
    marginBottom: 5,
  },

  inputContainer: {
    // padding: 10,
    borderTopWidth: 1,
    // borderBottomColor: '#CCC',
    // borderColor: 'transparent'
    borderColor: YTColors.listSeparator
  },
  input: {
    height: 52,
    flex: 1,
    fontSize: 17,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: 'rgba(255,255,255,0.7)'
  },
  details: {
    height: 52,
    flex: 1,
    fontSize: 17,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: 'rgba(255,255,255,0.7)'
  },
  inlineInput: {
    flexDirection: "row"
  },
  quarterInput: {
    flex: 0.25
  },
  halfInput: {
    flex: 0.5
  },
  notes: {
    height: 104,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    color: YTColors.lightText,
  },

});

class NewProduct extends Base {
  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false
      , newProduct: {
        title: ""
        , templateId: null
        , items: []
        , type: 'custom'
      }
    }
    this._bind(
      '_closeModal'
      , '_handleAction'
      , '_handleInputChange'
      , '_checkFormValid'
      , '_openLibrary'
    )

  }

  componentDidMount() {
    this.refs['newProduct.title'].focus();
  }

  _checkFormValid() {

    var requiredInputs = Object.keys(this.refs).filter((ref) => this.refs[ref].props.isRequired);

    var isValid = true;
    for(var i = 0; i < requiredInputs.length; i++) {

      // lodash to the rescue
      var theVal = _.get(this.state, requiredInputs[i]);
      if(!theVal || theVal.length < 1) {
        isValid = false;
      }
    }

    this.setState({isFormValid: isValid});
  }

  _handleAction() {
    console.log("_handleAction fired");

    const { dispatch, user } = this.props;
    const { newProduct } = this.state;
    if(!this.state.isFormValid) {
      Alert.alert("Whoops", "All fields are required.");
      return;
    }
    dispatch(singleActions.sendCreateMyProduct(newProduct)).then((res) => {
      // console.log('done');
      // console.log(res);
      this.props.navigator.pop();
    });
  }

  _closeModal() {
    this.props.navigator.pop();
  }

  _openLibrary() {
    this.refs['newProduct.title'].blur();
    this.props.navigator.push({library: true});
  }

  _handleInputChange(e, target) {
    var newState = _.update( this.state, target, function() {
      return e.nativeEvent.text;
    });
    console.log("input changed");
    this.setState(newState);
    this._checkFormValid();
  }

  _scrollToInput(e, refName) {
    setTimeout(() => {

      var scrollResponder = this.refs.myScrollView.getScrollResponder();
      // var scrollResponder = scrollView.getScrollRef();
      console.log("on focus called ", refName);
      console.log(this.refs[refName].props.returnKeyType);
      var offset = 130;
      console.log(offset);
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        ReactNative.findNodeHandle(this.refs[refName]),
        offset, // adjust depending on your contentInset
        /* preventNegativeScrollOffset */ true
        // false
      );
    }, 150);

  }

  render() {

    const { navigator, isFetching } = this.props;
    const { newProduct, isFormValid } = this.state;
    const leftItem = {
      title: 'Cancel',
      onPress: this._closeModal
    };
    const rightItem = {
      title: 'Import',
      onPress: this._openLibrary
    }

    return (
      <View style={styles.container} >
        <YTHeader
          navigator={navigator}
          leftItem={leftItem}
          rightItem={rightItem}
          title="New Product"
        />
        <ScrollView ref="myScrollView" keyboardDismissMode="interactive" style={[styles.formWrapper]}>
          <View style={styles.cell}>

            <Text style={styles.header}>Product Info</Text>
            <View style={styles.infoBox}>

              <View style={styles.inputContainer}>

                <Text style={styles.label}>Title</Text>
                <TextInput
                  ref="newProduct.title"
                  onFocus={ (e) => this._scrollToInput(e, 'newProduct.title')}
                  isRequired={true}
                  style={styles.input}

                  placeholder=""
                  placeholderTextColor={YTColors.lightText}
                  autoCorrect={true}
                  onChange={ (e) => this._handleInputChange(e, "newProduct.title") }

                  returnKeyType="go"
                  value={this.state.newProduct.title}
                  onSubmitEditing={this._handleAction}
                />
              </View>
            </View>
          </View>

          <View style={styles.cell}>
            <Text style={styles.header}>Product Description</Text>
            <View style={styles.infoBox}>
              <View style={styles.inputContatiner}>

                <Text style={styles.label}>Description</Text>
                <TextInput
                  ref="newProduct.description"
                  onFocus={ (e) => this._scrollToInput(e, 'newProduct.description')}
                  isRequired={true}
                  style={styles.input}

                  placeholder=""
                  placeholderTextColor={YTColors.lightText}
                  autoCorrect={true}
                  onChange={ (e) => this._handleInputChange(e, "newProduct.description")}

                  returnKeyType="go"
                  value={this.state.newProduct.description}
                  onSubmitEditing={this._handleAction}
                />
              </View>
            </View>
          </View>


          <View style={[styles.buttonWrapper, {paddingBottom: 20}]}>
            <YTButton
              onPress={this._handleAction}
              caption={isFetching ? "Creating..." : "Create new product"}

              isDisabled={!isFormValid}
            />

            <YTButton
              onPress={this._openLibrary}
              caption={"Import from Library"}
              type="secondary"
            />
          </View>
        </ScrollView>
      </View>
    )


  }


}


const mapStoreToProps = (store) => {

  return {

    user: store.user.current,
    isFetching: store.myProduct.isFetching,

  }
}

export default connect(mapStoreToProps)(NewProduct);
