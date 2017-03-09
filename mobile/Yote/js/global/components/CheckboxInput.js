// import react things
import React, { PropTypes } from 'react';
import Base from './BaseComponent';
import { connect } from 'react-redux';


// import react-native components
import ListView from 'ListView';
import Dimensions from 'Dimensions';
import Platform from 'Platform';
import StyleSheet from 'StyleSheet';
import View from 'View';
import Text from 'Text';
import Image from 'Image';
import ScrollView from 'ScrollView';
import TouchableOpacity from 'TouchableOpacity';
import TextInput from 'TextInput';
import Animated from 'Animated';

// import custom components

import CheckboxEmpty from './CheckboxEmpty';
import CheckboxFilled from './CheckboxFilled';

import MinusCircle from './MinusCircle';

import StarboxEmpty from './StarboxEmpty';
import StarboxFilled from './StarboxFilled';

// import libraries
import moment from 'moment';
import _ from 'lodash';



// import styles
import YTColors from '../styles/YTColors';

const BUTTON_HEIGHT = 32;

var styles = StyleSheet.create({
  inputWrapper: {
    paddingLeft: 4,
    paddingRight:4,
    backgroundColor: "#fff"
  },
  instructions: {
    color: YTColors.lightText,
    marginBottom: 5,
  },
  details: {
    // height: 52,
    flex: 1,
    // paddingTop: 8,
    // paddingBottom: 8,

  },
  button: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_HEIGHT * 0.5,
    // paddingHorizontal: 40,
  },
  icon: {
    marginBottom: 8,
    tintColor: YTColors.actionText,
  },
  caption: {
    letterSpacing: 1,
    fontSize: 14,
    color: YTColors.lightText,
  },
  input: {
    height: 52,
    flex: 1,
    fontSize: 17,
    paddingTop: 8,
    paddingBottom: 8,
    // backgroundColor: 'rgba(255,255,255,0.7)'
  },
  notes: {
    height: 104,
  },
  inlineInput: {
    flexDirection: "row"
  },
  quarterInput: {
    flex: 0.25
  },
  checkBoxInputCell: {
    flexDirection: 'row',
    paddingTop: 4,
    paddingBottom: 4,
    borderTopWidth: 1,
    // backgroundColor: "#fff",
    borderColor: YTColors.listSeparator,
  },
  checkBox: {
    // flex: 1,
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#11b9de'

  },
  checkBoxTextWrapper: {
    justifyContent: 'center',
    paddingVertical: 15,
    paddingLeft: 17,
    paddingRight: 9,
    flex: 1,
    // flexDirection: "row"
  },
  dueDate: {
    // color: "#fff",
    padding: 3,
    // backgroundColor: YTColors.actionText,
    color: YTColors.actionText,
    fontSize: 10,
    fontWeight: "700",
    textAlign: "right",
    flex: 0.5,
    marginTop: -4,
    marginBottom: 4,
  },
  completedDate: {
    color: YTColors.lightText,
    fontSize: 10,
    textAlign: "right",
    fontStyle: 'italic',
    flex: 0.5,
    marginTop: -4,
    marginBottom: 4,
  },
  essential: {

    textAlign: "center",
    padding: 4,
    paddingBottom: 2,
    color: YTColors.anagada,
    width: 60,
    borderColor: YTColors.anagada,
    // borderWidth: 2,
    borderWidth: 1,
    fontSize: 8,
    fontWeight: "700",
  },
  essentialWrapper: {
    justifyContent: 'center',
    // alignItems: 'flex-end',
    // marginLeft: 17,
    marginTop: 8,
    flex: 0.5,

  },
  detailsRow: {
    flex: 1,
    flexDirection: "row",
    marginTop: -4,
    marginBottom: 13,
  },
  starBox: {
    flex: 0.1,
    // alignItems: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  }
});



// const CheckboxInput = ({ item, onPress }) => {
class CheckboxInput extends Base {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(1),
      isChecked: this.props.item.isCompleted,
    }
    this._bind(
      '_onPress'
      , '_toggleImportance'
      , '_removeItem'
    );
  }



  componentWillReceiveProps(nextProps) {
    // console.log("************** ITEM componentWillReceiveProps");
    // console.log(nextProps.isEditing);
    this.setState({isChecked: nextProps.item.isCompleted});
  }

  _onPress() {
    if(this.props.isDisabled) {
      console.log("disabled");
    } else {

      this.props.onPress(this.props.item);
    }
    // this._triggerFadeOut();
    // setTimeout(() => this.props.onPress(this.props.item), 750)
  }

  _toggleImportance() {
    if(this.props.isDisabled ) {
      console.log("disabled");
    } else {

      this.props.toggleImportance(this.props.item);
    }
  }

  _removeItem() {
    this.props.removeItem(this.props.item);
  }

  render() {
    const { item, onPress, isEditing } = this.props;
    // console.log("___________________ITEM__________________");
    // console.log(item);
    let selectedCaptionStyle;
    let selectedBackgroundStyle;
    let selectedEssentialStyle;
    if(item.isCompleted) {

      selectedCaptionStyle = { color: YTColors.lightText, textDecorationLine: "line-through" };
      selectedBackgroundStyle = { backgroundColor: "transparent"};
      selectedEssentialStyle = { color: YTColors.lighterText, borderColor: YTColors.lighterText };
    }


    const checkbox = item.isCompleted ? <CheckboxFilled /> : <CheckboxEmpty />;
    // let rightBox;
    const starBox = item.isImportant ? <StarboxFilled /> : <StarboxEmpty />;

    // const removeBox = item.isRemoved ? <CheckboxEmpty /> : <CheckboxFilled />;
    const removeBox = <MinusCircle />;

    const rightBox = isEditing ? removeBox : starBox;


    var accessibilityTraits = ['button'];
    if (item.isCompleted) {
      accessibilityTraits.push('selected');
    }

    let dueDate;
    // item.dueDate = new Date();
    // item.isEssential = true;

    let completedDate;
    if(item.isCompleted) {
      completedDate = "Completed " + moment(item.dateCompleted).calendar();
    } else if(item.dueDate) {
      dueDate = "Due " + moment(item.dueDate).calendar(null, {sameElse: 'MM/DD/YYYY [at] h:mm a'});
    }

    const EDITING = isEditing ? "TRUE" : "FALSE";


    return (
    <View
      style={[
        styles.inputWrapper,
        selectedBackgroundStyle,
      ]}
    >

      <View
        style={[
          styles.checkBoxInputCell,
        ]}
      >

        <TouchableOpacity
          accessibilityTraits={accessibilityTraits}
          activeOpacity={0.8}
          onPress={this._onPress}
          style={[styles.checkBox]}>
          {checkbox}
        </TouchableOpacity>
        <View style={styles.checkBoxTextWrapper}>
          <View style={styles.details}>
            <Text style={[styles.label, selectedCaptionStyle]}>
              {item.text}
            </Text>
            {item.isEssential ?
              <View style={styles.essentialWrapper}>

                <Text style={[styles.essential, selectedEssentialStyle]}>
                  ESSENTIAL
                </Text>
              </View>
              :
              null
            }

          </View>



        </View>

        <TouchableOpacity
          accessibilityTraits={accessibilityTraits}
          activeOpacity={0.8}
          onPress={isEditing ? this._removeItem : this._toggleImportance}
          style={[styles.starBox]}>
          {rightBox}
        </TouchableOpacity>



      </View>

      {dueDate ?
        <Text style={styles.dueDate}>
          {dueDate}
        </Text>
        :
        null
      }
      {completedDate ?
        <Text style={styles.completedDate}>
          {completedDate}
        </Text>
        :
        null
      }


      </View>
    )
  }
}




export default CheckboxInput;
//
//
// transform: [{
//   translateY: this.state.fadeAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [ 150, 0]
//   }),
// }],
